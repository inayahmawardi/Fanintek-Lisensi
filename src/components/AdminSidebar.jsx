import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Users, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function AdminSidebar({ activeMenu = 'Dashboard' }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'Dashboard', href: '/dashboard-admin' },
  { icon: FolderKanban, label: 'Progress Proyek', key: 'Progress Proyek', href: '/progress-project' },
  { icon: TrendingUp, label: 'Business Development', key: 'Business Development', href: '/business-development' },
  { icon: AlertTriangle, label: 'Incident Management', key: 'Incident Management', href: '/incident' },
  { icon: FileText, label: 'Form Lisensi', key: 'License', href: '/license-form' },
  { icon: Users, label: 'User Management', key: 'Users', href: '#' },
  ];

  return (
    <div className="w-72 bg-white shadow-xl border-r border-gray-200">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center space-x-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-blue-100 text-sm">Management System</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Administrator</p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.key === activeMenu;
          return (
            <button
              key={index}
              onClick={() => {
                if (item.label === 'Form Lisensi') {
                  console.log('Navigating to /license-form');
                  navigate('/license-form');
                } else if (item.href !== '#') {
                  navigate(item.href);
                }
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 bg-white border-t border-gray-200 mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 mr-3 text-red-500 group-hover:text-red-600" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;