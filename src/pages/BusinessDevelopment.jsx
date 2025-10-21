import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import BDTable from '../features/business/BDTable';

const STORAGE_KEY = 'bd_items_v1';

const BusinessDevelopment = () => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const handleSave = (it) => setItems(prev => [it, ...prev]);
  const handleDelete = (id) => setItems(prev => prev.filter(p => p.id !== id));

  const navigate = useNavigate();

  return (
    <DashboardLayout userRole="admin" activeMenu="Business Development" headerTitle="Business Development" headerSubtitle="Manage leads and POC requests">
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-end">
            <button onClick={() => navigate('/business-development/new')} className="px-4 py-2 bg-blue-600 text-white rounded">Tambah Prospek</button>
          </div>
          <BDTable items={items} onDelete={handleDelete} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessDevelopment;
