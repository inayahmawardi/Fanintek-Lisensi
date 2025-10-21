import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  FolderKanban,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function SalesSidebar({ activeMenu = 'Dashboard' }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard Sales', key: 'Dashboard', href: '/dashboard-sales' },
    { icon: FolderKanban, label: 'Progress Proyek', key: 'Progress Proyek', href: '/progress-project' },
    { icon: TrendingUp, label: 'Incident Management', key: 'Incidents', href: '/incident' },
    { icon: Users, label: 'User Management', key: 'Users', href: '#' },
  ];

  return (
    <div className="w-72 bg-white shadow-xl border-r border-gray-200">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-green-600 to-green-700">
        <div className="flex items-center space-x-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Sales Panel</h2>
            <p className="text-green-100 text-sm">Performance Tracking</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Sales Representative</p>
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
              onClick={() => item.href !== '#' && navigate(item.href)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-green-50 text-green-700 shadow-sm border border-green-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-green-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
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

export default SalesSidebar;