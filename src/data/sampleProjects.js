import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Sample project data dengan tema sesuai perusahaan teknologi
const sampleProjects = [
  {
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
  },
  {
    clientName: 'PT Retailindo Maju',
    projectName: 'E-commerce Platform',
    projectCode: 'RM-ECOM-2024-008',
    workType: 'Development',
    startDate: '2024-09-01',
    endDate: '2025-02-28',
    status: 'on track',
    progressUpdate: 'Payment gateway integration selesai. Testing checkout flow dengan berbagai metode pembayaran.',
    pic: 'Lisa Andriani',
    issues: 'Issue dengan integrasi payment Gopay, sudah escalate ke vendor',
    pendingItems: 'Load testing untuk peak season',
    lastUpdated: '2025-01-13'
  },
  {
    clientName: 'Kementerian Teknologi',
    projectName: 'Dashboard Monitoring IoT',
    projectCode: 'KEMTEK-IOT-2025-001',
    workType: 'Development',
    startDate: '2024-12-01',
    endDate: '2025-05-31',
    status: 'good',
    progressUpdate: 'Real-time data visualization 70% complete. Integration dengan sensor devices berjalan stabil.',
    pic: 'Eko Prasetyo',
    issues: '',
    pendingItems: 'UAT dengan end user dari berbagai departemen',
    lastUpdated: '2025-01-14'
  },
  {
    clientName: 'PT Smart City Solutions',
    projectName: 'Maintenance Infrastructure Cloud',
    projectCode: 'SCS-CLOUD-2025-001',
    workType: 'Maintenance',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'good',
    progressUpdate: 'Monthly health check completed. All services running optimal. Cost optimization berhasil reduce 15%.',
    pic: 'Andi Wijaya',
    issues: '',
    pendingItems: 'Migration plan untuk upgrade infrastructure Q2',
    lastUpdated: '2025-01-13'
  }
];

// Function to add sample data to Firestore
export const addSampleProjects = async () => {
  try {
    console.log('Adding sample projects to Firestore...');
    
    for (const project of sampleProjects) {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`Project added with ID: ${docRef.id}`);
    }
    
    console.log('All sample projects added successfully!');
    return { success: true, message: 'Sample projects added successfully' };
  } catch (error) {
    console.error('Error adding sample projects:', error);
    return { success: false, message: error.message };
  }
};

export default sampleProjects;