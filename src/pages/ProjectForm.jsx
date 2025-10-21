import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useProjectsData from '../hooks/useProjectsData';
import DashboardLayout from '../components/DashboardLayout';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const initialState = {
  clientName: '',
  projectName: '',
  projectCode: '',
  startDate: '',
  endDate: '',
  workType: '',
  progressUpdate: '',
  issues: '',
  pendingItems: '',
  picShort: '',
  estimateShort: '',
  actionShort: '',
  picLong: '',
  estimateLong: '',
  actionLong: '',
  lastUpdated: '',
  status: '',
};

function ProjectForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addProject, updateProject, projects } = useProjectsData();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // Prefill for edit
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setEditId(id);
      const project = projects.find(p => p.id === id);
      if (project) {
        setForm({ ...initialState, ...project });
      }
    }
  }, [location.search, projects]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...form,
        lastUpdated: new Date().toISOString(),
      };
      if (editId) {
        await updateProject(editId, data);
      } else {
        await addProject(data);
      }
      navigate('/progress-project');
    } catch (err) {
      alert('Gagal menyimpan data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      userRole="admin"
      activeMenu="Progress Proyek"
      headerTitle={editId ? 'Edit Proyek' : 'Tambah Proyek'}
      headerSubtitle="Formulir data proyek lengkap (short & long term)"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 border border-cyan-100 mt-8">
        <button
          className="flex items-center text-cyan-600 hover:text-cyan-800 mb-6"
          onClick={() => navigate('/progress-project')}
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Kembali ke Progress Proyek
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Client/Perusahaan</label>
              <input name="clientName" value={form.clientName} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Proyek</label>
              <input name="projectName" value={form.projectName} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kode Proyek</label>
              <input name="projectCode" value={form.projectCode} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jenis Pekerjaan</label>
              <select
                name="workType"
                value={form.workType}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              >
                <option value="">Pilih Jenis Pekerjaan</option>
                <option value="Projek">Projek</option>
                <option value="Maintenance">Maintenance</option>
                <option value="POC">POC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Timeline Mulai</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Timeline Selesai</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status Progres</label>
              <select name="status" value={form.status} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-2">
                <option value="">Pilih Status</option>
                <option value="Progres Good">Progres Good</option>
                <option value="Progres not good">Progres not good</option>
                <option value="Progres Delay">Progres Delay</option>
                <option value="Progres on track">Progres on track</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal Update</label>
              <input type="date" name="lastUpdated" value={form.lastUpdated?.slice(0,10) || ''} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
          </div>

          {/* Short Term */}
          <div className="mt-8">
            <h3 className="font-bold text-cyan-700 mb-2">Short Term</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">PIC</label>
                <input name="picShort" value={form.picShort} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimasi Waktu & Plan</label>
                <input name="estimateShort" value={form.estimateShort} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Action Task</label>
                <input name="actionShort" value={form.actionShort} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
              </div>
            </div>
          </div>

          {/* Long Term */}
          <div className="mt-8">
            <h3 className="font-bold text-blue-700 mb-2">Long Term</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">PIC</label>
                <input name="picLong" value={form.picLong} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimasi Waktu & Plan</label>
                <input name="estimateLong" value={form.estimateLong} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Action Task</label>
                <input name="actionLong" value={form.actionLong} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
              </div>
            </div>
          </div>

          {/* Lainnya */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Update Progres</label>
              <input name="progressUpdate" value={form.progressUpdate} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permasalahan</label>
              <input name="issues" value={form.issues} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pendingan</label>
              <input name="pendingItems" value={form.pendingItems} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-2" />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              onClick={() => navigate('/progress-project')}
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold flex items-center justify-center hover:from-cyan-700 hover:to-blue-700 shadow-lg"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save className="h-5 w-5 mr-2" />}
              Simpan
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default ProjectForm;
