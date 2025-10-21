import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { 
  BarChart3, 
  Users, 
  FolderKanban, 
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';

function DashboardAdmin() {
  const { currentUser } = useAuth();

  const statsCards = [
    { title: 'Total Projects', value: '12', color: 'bg-blue-500', icon: FolderKanban },
    { title: 'Active Projects', value: '8', color: 'bg-green-500', icon: BarChart3 },
    { title: 'Completed', value: '4', color: 'bg-orange-500', icon: CheckCircle2 },
    { title: 'Total User', value: '25', color: 'bg-purple-500', icon: Users },
  ];

  return (
    <DashboardLayout
      userRole="admin"
      activeMenu="Dashboard"
      headerTitle="Dashboard Overview"
      headerSubtitle="Monitor your projects and system performance"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-xs text-green-600 font-medium">+12% from last month</span>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl ${card.color} shadow-lg`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Recent Projects</h3>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <FolderKanban className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">E-Commerce Platform</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Updated 2 hours ago</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-green-500 text-white rounded-full shadow">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <FolderKanban className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Analytics Dashboard</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Updated 5 hours ago</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-blue-500 text-white rounded-full shadow">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mobile App Redesign</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Completed yesterday</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-orange-500 text-white rounded-full shadow">
                DONE
              </span>
            </div>
          </div>
        </div>

        {/* System Alerts Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">System Alerts</h3>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Manage All</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
              <div className="flex items-center space-x-4">
                <div className="bg-red-500 p-2 rounded-lg animate-pulse">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Server Maintenance</p>
                  <p className="text-sm text-red-600 font-medium">2 hours ago</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-full shadow">
                CRITICAL
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-500 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Database Backup</p>
                  <p className="text-sm text-yellow-600 font-medium">6 hours ago</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-yellow-500 text-white rounded-full shadow">
                WARNING
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">API Rate Limits</p>
                  <p className="text-sm text-blue-600 font-medium">1 day ago</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-blue-500 text-white rounded-full shadow">
                INFO
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardAdmin;