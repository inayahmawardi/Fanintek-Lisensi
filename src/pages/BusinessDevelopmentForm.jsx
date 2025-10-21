import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import BDForm from '../features/business/BDForm';

const STORAGE_KEY = 'bd_items_v1';

const BusinessDevelopmentForm = () => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const navigate = useNavigate();

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const handleSave = (it) => {
    setItems(prev => [it, ...prev]);
    navigate('/business-development');
  };

  return (
    <DashboardLayout userRole="admin" activeMenu="Business Development" headerTitle="Tambah Prospek" headerSubtitle="Tambah data prospek baru">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <BDForm onSave={handleSave} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessDevelopmentForm;
