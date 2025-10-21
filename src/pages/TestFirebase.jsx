import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function TestFirebase() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setLoading(true);
    setMessage('Testing Firebase connection...');
    
    try {
      console.log('Firebase Auth instance:', auth);
      console.log('Firebase DB instance:', db);
      setMessage('✅ Firebase connection successful! Auth and Firestore are ready.');
    } catch (error) {
      console.error('Firebase connection error:', error);
      setMessage('❌ Firebase connection failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('❌ Please enter email and password');
      return;
    }

    setLoading(true);
    setMessage('Creating user account...');
    
    try {
      console.log('Attempting to create user with:', email);
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      
      setMessage('✅ Step 1: User authentication created successfully!');
      
      // Save user data to Firestore
      const userData = {
        email: userCredential.user.email,
        role: 'admin',
        createdAt: new Date().toISOString(),
        uid: userCredential.user.uid
      };
      
      console.log('Saving user data to Firestore:', userData);
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      
      setMessage('✅ Registration successful! User created and saved to Firestore.');
      setEmail('');
      setPassword('');
      
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Registration failed: ';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'Email is already registered';
          break;
        case 'auth/weak-password':
          errorMessage += 'Password is too weak (min 6 characters)';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Invalid email format';
          break;
        case 'auth/operation-not-allowed':
          errorMessage += 'Email/Password authentication is not enabled in Firebase Console';
          break;
        case 'permission-denied':
          errorMessage += 'Firestore permission denied. Check Firestore rules.';
          break;
        default:
          errorMessage += error.message;
      }
      
      setMessage('❌ ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>🔥 Firebase Authentication Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testFirebaseConnection}
          disabled={loading}
          style={{
            backgroundColor: '#4285F4',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Testing...' : 'Test Firebase Connection'}
        </button>
      </div>

      <form onSubmit={testRegistration} style={{ marginBottom: '20px' }}>
        <h3>Test User Registration</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#34A853',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            fontSize: '16px'
          }}
        >
          {loading ? 'Creating Account...' : 'Test Registration'}
        </button>
      </form>

      {message && (
        <div style={{
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          marginBottom: '20px',
          whiteSpace: 'pre-wrap'
        }}>
          {message}
        </div>
      )}

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '5px',
        border: '1px solid #e9ecef'
      }}>
        <h4>📋 Setup Instructions:</h4>
        <ol>
          <li>Go to <a href="https://console.firebase.google.com/project/fandashboard" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
          <li>Navigate to <strong>Authentication</strong> → <strong>Sign-in method</strong></li>
          <li>Enable <strong>Email/Password</strong> provider</li>
          <li>Go to <strong>Firestore Database</strong></li>
          <li>Create database in <strong>production mode</strong></li>
          <li>Update Firestore rules to allow read/write for authenticated users</li>
        </ol>
      </div>
    </div>
  );
}

export default TestFirebase;