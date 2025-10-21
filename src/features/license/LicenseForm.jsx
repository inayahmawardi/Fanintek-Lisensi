import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import LicenseInput from './input';

export default function LicenseForm() {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLicenses() {
      try {
        const querySnapshot = await getDocs(collection(db, 'licenses'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLicenses(data);
      } catch (err) {
        console.error('Error fetching licenses:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLicenses();
  }, []);

  return (
    <DashboardLayout
      userRole="admin"
      activeMenu="License"
      headerTitle="Data Pengajuan Lisensi"
      headerSubtitle="Daftar pengajuan lisensi aplikasi yang masuk"
    >
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Tabel Pengajuan Lisensi</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/license-input')}
          >
            + Tambah Data
          </button>
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Company</th>
                  <th className="border px-2 py-1">Applicant</th>
                  <th className="border px-2 py-1">Position</th>
                  <th className="border px-2 py-1">Project</th>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Status</th>
                  <th className="border px-2 py-1">App/Tools</th>
                  <th className="border px-2 py-1">Type</th>
                  <th className="border px-2 py-1">Qty</th>
                  <th className="border px-2 py-1">Duration</th>
                  <th className="border px-2 py-1">Purpose</th>
                  <th className="border px-2 py-1">Description</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((row, idx) => (
                  <tr key={row.id || idx} className="border-b">
                    <td className="border px-2 py-1">{row.companyName}</td>
                    <td className="border px-2 py-1">{row.applicantName}</td>
                    <td className="border px-2 py-1">{row.position}</td>
                    <td className="border px-2 py-1">{row.projectName}</td>
                    <td className="border px-2 py-1">{row.submissionDate}</td>
                    <td className="border px-2 py-1">{row.status}</td>
                    <td className="border px-2 py-1">{row.applicationName}</td>
                    <td className="border px-2 py-1">{row.type}</td>
                    <td className="border px-2 py-1">{row.quantity}</td>
                    <td className="border px-2 py-1">{row.duration}</td>
                    <td className="border px-2 py-1">{row.purpose}</td>
                    <td className="border px-2 py-1">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {licenses.length === 0 && (
              <div className="text-center py-10 text-gray-500">Belum ada data lisensi.</div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
