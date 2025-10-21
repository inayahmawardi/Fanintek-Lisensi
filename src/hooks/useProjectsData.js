import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Dummy data untuk testing sementara
const dummyProjects = [
  {
    id: '1',
    clientName: 'PT Teknologi Indonesia',
    projectName: 'Sistem Manajemen ERP',
    projectCode: 'TI-ERP-2025-001',
    workType: 'Development',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    status: 'good',
    progressUpdate: 'Modul User Management telah selesai 95%. Testing dalam proses.',
    pic: 'Ahmad Rahman',
    issues: '',
    pendingItems: 'Approval testing environment dari client',
    lastUpdated: '2025-01-14'
  },
  {
    id: '2',
    clientName: 'CV Digital Solutions',
    projectName: 'Website Company Profile',
    projectCode: 'DS-WEB-2025-002',
    workType: 'Development',
    startDate: '2024-12-15',
    endDate: '2025-02-15',
    status: 'on track',
    progressUpdate: 'Design UI/UX selesai. Development frontend 60% complete.',
    pic: 'Sari Wijaya',
    issues: 'Menunggu konten dari client untuk halaman produk',
    pendingItems: 'Final approval design homepage',
    lastUpdated: '2025-01-13'
  },
  {
    id: '3',
    clientName: 'PT Maju Bersama',
    projectName: 'Mobile App Inventory',
    projectCode: 'MB-MOB-2025-003',
    workType: 'Development',
    startDate: '2024-11-01',
    endDate: '2025-03-31',
    status: 'delay',
    progressUpdate: 'Backend API development 80%. Mobile app development tertunda karena perubahan requirement.',
    pic: 'Budi Santoso',
    issues: 'Client mengubah requirement untuk fitur barcode scanner',
    pendingItems: 'Meeting untuk finalisasi requirement baru',
    lastUpdated: '2025-01-12'
  },
  {
    id: '4',
    clientName: 'PT Global Tech',
    projectName: 'Server Maintenance Q1 2025',
    projectCode: 'GT-MAINT-2025-001',
    workType: 'Maintenance',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    status: 'good',
    progressUpdate: 'Maintenance rutin server web berjalan lancar. Uptime 99.8%.',
    pic: 'Dewi Lestari',
    issues: '',
    pendingItems: 'Schedule maintenance database server bulan depan',
    lastUpdated: '2025-01-14'
  },
  {
    id: '5',
    clientName: 'Startup Innovation Labs',
    projectName: 'POC AI Chatbot Integration',
    projectCode: 'SIL-POC-2025-001',
    workType: 'Proof of Concept',
    startDate: '2025-01-08',
    endDate: '2025-02-28',
    status: 'good',
    progressUpdate: 'Setup environment AI model completed. Integration testing dengan API WhatsApp Business.',
    pic: 'Rizki Pratama',
    issues: '',
    pendingItems: 'Training data untuk improve accuracy chatbot',
    lastUpdated: '2025-01-14'
  }
];

const useProjectsData = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Aktifkan kembali koneksi Firestore
    const projectsQuery = collection(db, 'projects');
    const unsubscribe = onSnapshot(
      projectsQuery,
      (querySnapshot) => {
        try {
          const projectsData = [];
          querySnapshot.forEach((doc) => {
            projectsData.push({
              id: doc.id,
              ...doc.data()
            });
          });
          // Sort client-side by lastUpdated
          projectsData.sort((a, b) => {
            const dateA = new Date(a.lastUpdated || 0);
            const dateB = new Date(b.lastUpdated || 0);
            return dateB - dateA;
          });
          setProjects(projectsData);
          setLoading(false);
          setError(null);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // CRUD helpers
  const addProject = async (data) => {
    const docRef = await addDoc(collection(db, 'projects'), data);
    return docRef.id;
  };

  const updateProject = async (id, data) => {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, data);
  };

  const deleteProject = async (id) => {
    const docRef = doc(db, 'projects', id);
    await deleteDoc(docRef);
  };

  // Calculate summary statistics
  const stats = {
  totalProjects: projects.length,
  activeProjects: projects.filter(p => p.status?.toLowerCase() !== 'completed').length,
  projekProjects: projects.filter(p => p.workType === 'Projek').length,
  maintenanceProjects: projects.filter(p => p.workType === 'Maintenance').length,
  pocProjects: projects.filter(p => p.workType === 'POC').length,
  goodStatus: projects.filter(p => p.status?.toLowerCase() === 'good').length,
  onTrackStatus: projects.filter(p => p.status?.toLowerCase() === 'on track').length,
  delayStatus: projects.filter(p => p.status?.toLowerCase() === 'delay').length
  };

  // Filter and search functions
  const filterProjects = (searchTerm = '', statusFilter = 'all') => {
    let filteredProjects = [...projects];

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredProjects = filteredProjects.filter(project =>
        project.clientName?.toLowerCase().includes(term) ||
        project.projectName?.toLowerCase().includes(term) ||
        project.projectCode?.toLowerCase().includes(term) ||
        project.pic?.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filteredProjects = filteredProjects.filter(project =>
        project.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filteredProjects;
  };

  return {
    projects,
    loading,
    error,
    stats,
    filterProjects,
    addProject,
    updateProject,
    deleteProject
  };
};

export default useProjectsData;