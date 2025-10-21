import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  async function signup(email, password, role = 'sales') {
    try {
      console.log('Starting signup process...', { email, role });
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('User created successfully:', user.uid);
      
      // Save user role to Firestore
      const userData = {
        email: user.email,
        role: role,
        createdAt: new Date().toISOString(),
        uid: user.uid
      };
      
      console.log('Saving user data to Firestore...', userData);
      await setDoc(doc(db, 'users', user.uid), userData);
      
      console.log('User data saved successfully');
      toast.success('Akun berhasil dibuat!');
      return userCredential;
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error code:', error.code);
      
      let errorMessage = 'Gagal membuat akun: ';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'Email sudah terdaftar';
          break;
        case 'auth/weak-password':
          errorMessage += 'Password terlalu lemah (minimal 6 karakter)';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Format email tidak valid';
          break;
        case 'auth/operation-not-allowed':
          errorMessage += 'Email/Password authentication belum diaktifkan di Firebase Console';
          break;
        case 'permission-denied':
          errorMessage += 'Akses ke Firestore ditolak. Periksa aturan Firestore.';
          break;
        default:
          errorMessage += error.message;
      }
      
      toast.error(errorMessage);
      throw error;
    }
  }

  // Sign in function
  async function signin(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login berhasil!');
      return userCredential;
    } catch (error) {
      console.error('Signin error:', error);
      toast.error('Login gagal: ' + error.message);
      throw error;
    }
  }

  // Sign out function
  async function logout() {
    try {
      await signOut(auth);
      setUserRole(null);
      toast.success('Logout berhasil!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout gagal: ' + error.message);
    }
  }

  // Get user role from Firestore
  async function getUserRole(uid) {
    try {
      console.log('Fetching user role from Firestore for UID:', uid);
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User data retrieved:', userData);
        return userData.role;
      } else {
        console.log('User document does not exist in Firestore');
        return 'admin'; // Default role if no document found
      }
    } catch (error) {
      console.error('Error getting user role:', error);
      return 'admin'; // Default role on error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email || 'No user');
      setCurrentUser(user);
      
      if (user) {
        // Get user role when user is authenticated
        console.log('Getting user role for:', user.uid);
        const role = await getUserRole(user.uid);
        console.log('User role retrieved:', role);
        setUserRole(role);
      } else {
        console.log('No user, clearing role');
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    signin,
    logout,
    getUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}