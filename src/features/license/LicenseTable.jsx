import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function LicenseTable({ data = [] }) {
  // Dummy data for demo
  const rows = data.length > 0 ? data : [
    {
      companyName: 'PT. FAN INTEGRASI TEKNOLOGI',
      applicantName: 'Budi',
      position: 'IT Consultant',
      projectName: 'ERP Implementation',
      submissionDate: '2025-10-20',
      status: 'Pending',
      applicationName: 'SAP',
      type: 'Enterprise',
      quantity: 10,
      duration: '1 Year',
      purpose: 'Project Deployment',
      description: 'Butuh lisensi untuk implementasi ERP.'
    }
  ];

  return (
    <DashboardLayout
      userRole="admin"
      activeMenu="License"
      headerTitle="Data Pengajuan Lisensi"
      headerSubtitle="Daftar pengajuan lisensi aplikasi yang masuk"
    >
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Tabel Pengajuan Lisensi</h2>
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
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b">
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
        </div>
      </div>
    </DashboardLayout>
  );
}
