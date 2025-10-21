import React, { useState, useMemo } from 'react';
// ErrorBoundary sederhana untuk mencegah error di child membuat parent hilang
class TableErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Bisa log error ke service eksternal di sini
  }
  render() {
    if (this.state.hasError) {
      return <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">Terjadi error saat menampilkan tabel proyek.</div>;
    }
    return this.props.children;
  }
}
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ProgressCard from '../features/progress/components/ProgressCard';
import ProgressCardDemo from '../features/progress/components/ProgressCardDemo';
import ProgressTable from '../features/progress/components/ProgressTable';
import ProjectModal from '../features/progress/components/ProjectModal';
import useProjectsData from '../features/progress/hooks/useProjectsData';
import { 
  FolderKanban, 
  Settings, 
  Search, 
  RefreshCw,
  Filter,
  Download,
  Plus,
  AlertTriangle
} from 'lucide-react';

function ProgressProject() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { projects = [], loading, error, stats = {}, filterProjects, deleteProject } = useProjectsData();
  
  // Local state for filters and modal
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on search and status
  const filteredProjects = useMemo(() => {
    if (typeof filterProjects === 'function') {
      return filterProjects(searchTerm, statusFilter) || [];
    }
    return [];
  }, [projects, searchTerm, statusFilter, filterProjects]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleRefresh = () => {
    // Force refresh by clearing cache (in real app, you might want to implement a proper refresh)
    window.location.reload();
  };

  // CRUD handlers
  const handleAdd = () => navigate('/project-form');
  const handleEdit = (project) => navigate(`/project-form?id=${project.id}`);
  const handleDelete = async (project) => {
    if (window.confirm(`Yakin hapus proyek "${project.projectName}"?`)) {
      await deleteProject(project.id);
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        userRole={currentUser?.role || 'admin'}
        activeMenu="Progress Proyek"
        headerTitle="Progress Proyek"
        headerSubtitle="Loading project data..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            <p className="text-gray-600 mt-4">Loading projects...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        userRole={currentUser?.role || 'admin'}
        activeMenu="Progress Proyek"
        headerTitle="Progress Proyek"
        headerSubtitle="Error loading data"
      >
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
            <p className="text-red-600 font-semibold">Error loading projects</p>
            <p className="text-gray-600 text-sm mt-1">{error}</p>
            <button 
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      userRole={currentUser?.role || 'admin'}
      activeMenu="Progress Proyek"
      headerTitle="Progress Proyek"
      headerSubtitle="Laporan dan pemantauan progres seluruh proyek berjalan, maintenance, dan proof of concept perusahaan"
    >
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6 relative">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Project Progress Dashboard</h1>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8">
        <ProgressCardDemo />
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                placeholder="Cari berdasarkan nama client, proyek, atau PIC..."
              />
            </div>
          </div>
          {/* Status Filter */}
          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all appearance-none cursor-pointer"
              >
                <option value="all">Semua Status</option>
                <option value="good">Good ({stats.goodStatus})</option>
                <option value="on track">On Track ({stats.onTrackStatus})</option>
                <option value="delay">Delay ({stats.delayStatus})</option>
              </select>
            </div>
          </div>
        </div>
        {/* Filter Results Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredProjects.length} of {stats.totalProjects} projects
          </span>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Tombol Aksi di atas tabel */}
      <div className="flex justify-end items-center mb-4 gap-3">
        <button className="inline-flex items-center px-4 py-2 border border-cyan-600 text-cyan-700 bg-white text-sm font-semibold rounded-lg hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm transition-all">
          <Download className="h-4 w-4 mr-2 text-cyan-600" />
          Export Data
        </button>
        {(!currentUser?.role || currentUser?.role === 'admin') && (
          <button onClick={handleAdd} className="inline-flex items-center px-4 py-2 border border-green-600 text-green-700 bg-white text-sm font-semibold rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition-all">
            <Plus className="h-4 w-4 mr-2 text-green-600" />
            Tambah Proyek
          </button>
        )}
      </div>

      {/* Projects Table */}
      <TableErrorBoundary>
        <ProgressTable 
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </TableErrorBoundary>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </DashboardLayout>
  );
}

export default ProgressProject;