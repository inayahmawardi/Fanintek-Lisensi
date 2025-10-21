import React from 'react';

const ProgressCard = ({ title, value, icon: Icon, type, className = '' }) => {
  const getCardStyle = () => {
    switch (type) {
      case 'projects':
        return 'border-blue-500/30';
      case 'maintenance':
        return 'border-amber-500/30';
      case 'poc':
        return 'border-purple-500/30';
      default:
        return 'border-gray-300';
    }
  };

  const getIconStyle = () => {
    switch (type) {
      case 'projects':
        return 'bg-blue-100 text-blue-600';
      case 'maintenance':
        return 'bg-amber-100 text-amber-600';
      case 'poc':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div
      className={`
        bg-white rounded-lg border p-4 
        shadow-sm hover:shadow-md transition-all duration-300 
        ${getCardStyle()}
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-medium mb-1">
            {title}
          </p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-1 space-x-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-[10px] text-green-600">Real-time</span>
          </div>
        </div>
        <div className={`p-2 rounded-md ${getIconStyle()}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
