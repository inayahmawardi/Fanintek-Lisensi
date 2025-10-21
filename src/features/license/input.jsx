import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function LicenseInput() {
  console.log('LicenseInput rendered');
  const [form, setForm] = useState({
    companyName: '',
    applicantName: '',
    position: '',
    projectName: '',
    submissionDate: '',
    status: '',
    applicationName: '',
    type: '',
    quantity: '',
    duration: '',
    purpose: '',
    description: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    try {
      await addDoc(collection(db, 'licenses'), form);
      setSuccess(true);
      setForm({
        companyName: '', applicantName: '', position: '', projectName: '', submissionDate: '', status: '',
        applicationName: '', type: '', quantity: '', duration: '', purpose: '', description: '',
      });
    } catch (err) {
      setError('Gagal menyimpan data!');
      console.error('Error saving license:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      userRole="admin"
      activeMenu="License"
      headerTitle="Form Lisensi"
      headerSubtitle="Isi data pengajuan lisensi aplikasi"
    >
      <div className="max-w-3xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow p-6">
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Data berhasil disimpan!</div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}
          <h2 className="text-xl font-bold mb-4">Licensi Application Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Company Name</label>
              <input type="text" name="companyName" value={form.companyName} onChange={handleChange} className="form-control" required />
            </div>
            <div>
              <label className="block font-medium mb-1">Applicant Name</label>
              <input type="text" name="applicantName" value={form.applicantName} onChange={handleChange} className="form-control" required />
            </div>
            <div>
              <label className="block font-medium mb-1">Position / Departement</label>
              <input type="text" name="position" value={form.position} onChange={handleChange} className="form-control" />
            </div>
            <div>
              <label className="block font-medium mb-1">Proyek Name</label>
              <input type="text" name="projectName" value={form.projectName} onChange={handleChange} className="form-control" />
            </div>
            <div>
              <label className="block font-medium mb-1">Submission Date</label>
              <input type="date" name="submissionDate" value={form.submissionDate} onChange={handleChange} className="form-control" />
            </div>
            <div>
              <label className="block font-medium mb-1">Status</label>
              <input type="text" name="status" value={form.status} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-6 mb-2">Licensi Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Application Name / Tools</label>
              <input type="text" name="applicationName" value={form.applicationName} onChange={handleChange} className="form-control" required />
            </div>
            <div>
              <label className="block font-medium mb-1">Type of License</label>
              <input type="text" name="type" value={form.type} onChange={handleChange} className="form-control" />
            </div>
            <div>
              <label className="block font-medium mb-1">Quantity of Licenses</label>
              <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="form-control" />
            </div>
            <div>
              <label className="block font-medium mb-1">Duration of License</label>
              <input type="text" name="duration" value={form.duration} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-span-2">
              <label className="block font-medium mb-1">Purpose of Use</label>
              <input type="text" name="purpose" value={form.purpose} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-medium mb-1">Requirement Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows={3} />
          </div>
          <div className="mt-6 flex gap-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="reset" className="btn btn-secondary" disabled={loading}>Reset</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
