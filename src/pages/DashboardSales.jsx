import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Target,
  Calendar 
} from 'lucide-react';

function DashboardSales() {
  const { currentUser } = useAuth();

  const statsCards = [
    { title: 'Target Bulan Ini', value: 'Rp 100M', color: 'bg-blue-500', icon: Target },
    { title: 'Penjualan Bulan Ini', value: 'Rp 75M', color: 'bg-green-500', icon: DollarSign },
    { title: 'Pencapaian', value: '75%', color: 'bg-purple-500', icon: TrendingUp },
    { title: 'Prospek Baru', value: '24', color: 'bg-orange-500', icon: Users },
  ];

  const salesData = [
    { date: '2025-01-01', amount: 15000000, client: 'PT ABC Corp' },
    { date: '2025-01-03', amount: 8500000, client: 'CV XYZ Ltd' },
    { date: '2025-01-05', amount: 12000000, client: 'PT Maju Jaya' },
    { date: '2025-01-08', amount: 20000000, client: 'PT Global Tech' },
    { date: '2025-01-10', amount: 9500000, client: 'CV Digital Solutions' },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout
      userRole="sales"
      activeMenu="Dashboard"
      headerTitle="Sales Dashboard"
      headerSubtitle="Monitor your sales performance and targets"
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
                    <span className="text-xs text-green-600 font-medium">+8% from last month</span>
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

      {/* Sales Chart and Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Monthly Sales Performance</h3>
              <button className="text-green-600 text-sm font-medium hover:text-green-700">View Details</button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center border border-green-200">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <p className="text-green-700 font-semibold">Sales Chart Coming Soon</p>
                <p className="text-sm text-green-600">Chart.js or Recharts integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Recent Sales</h3>
              <button className="text-green-600 text-sm font-medium hover:text-green-700">View All</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {salesData.map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{sale.client}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(sale.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 text-lg">{formatCurrency(sale.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200 group">
                <DollarSign className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Add New Sale</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200 group">
                <Users className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Add Prospect</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200 group">
                <TrendingUp className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardSales;