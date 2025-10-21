import React from 'react';
import AdminSidebar from './AdminSidebar';
import SalesSidebar from './SalesSidebar';
import DashboardHeader from './DashboardHeader';

function DashboardLayout({ 
  userRole, 
  activeMenu, 
  headerTitle, 
  headerSubtitle, 
  userName,
  children 
}) {
  const renderSidebar = () => {
    if (userRole === 'admin') {
      return <AdminSidebar activeMenu={activeMenu} />;
    } else if (userRole === 'sales') {
      return <SalesSidebar activeMenu={activeMenu} />;
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Header */}
        <DashboardHeader 
          title={headerTitle}
          subtitle={headerSubtitle}
          userRole={userRole}
          userName={userName}
        />

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;