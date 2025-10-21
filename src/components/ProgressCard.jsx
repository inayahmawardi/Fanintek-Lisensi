import React from 'react';
import { FolderKanban, Settings, Search } from 'lucide-react';

const ProgressCard = ({ title, value, icon: Icon, type }) => {
  const getCardStyle = () => {
    switch (type) {
      case 'projects':
        return 'bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400';
      case 'maintenance':
        return 'bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-400';
      case 'poc':
        return 'bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-400';
      default:
        return 'bg-gradient-to-br from-gray-50 to-slate-50 border-l-4 border-gray-400';
    }
  };

  const getIconStyle = () => {
    switch (type) {
      case 'projects':
        return 'bg-blue-100 text-blue-600';
      case 'maintenance':
        return 'bg-orange-100 text-orange-600';
      case 'poc':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 ${getCardStyle()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-xs text-green-600 font-medium">Updated real-time</span>
          </div>
        </div>
        <div className={`p-4 rounded-2xl shadow-lg ${getIconStyle()}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;