import React from 'react';
import logo from '../assets/fan-logo.png';

function DashboardHeader({ title, subtitle, userRole = 'Admin', userName }) {
  const getRoleColor = () => {
    return userRole === 'admin' ? 'blue' : 'green';
  };

  const color = getRoleColor();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="text-sm font-semibold text-gray-900">
              {userName || (userRole === 'admin' ? 'Admin' : 'Sales Representative')}
            </p>
          </div>
          <div className="p-2 rounded-full bg-white flex items-center justify-center" style={{ width: 48, height: 48 }}>
            <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;