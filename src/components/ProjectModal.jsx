import React from 'react';
import { X, Calendar, User, AlertTriangle, Clock, FileText } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'on track':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delay':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl sm:align-middle">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Project Details</h3>
                <p className="text-cyan-100 text-sm">Detailed information and progress tracking</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-20"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-cyan-600" />
                    Project Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Client Name</label>
                      <p className="text-base font-semibold text-gray-900 mt-1">{project.clientName || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Project Name</label>
                      <p className="text-base font-semibold text-gray-900 mt-1">{project.projectName || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Project Code</label>
                      <p className="text-base font-mono bg-cyan-50 text-cyan-800 px-3 py-1 rounded-md mt-1 inline-block">
                        {project.projectCode || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Work Type</label>
                      <p className="text-base text-gray-900 mt-1">{project.workType || 'Development'}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Timeline
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Start Date</label>
                      <p className="text-base text-gray-900 mt-1">{formatDate(project.startDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">End Date</label>
                      <p className="text-base text-gray-900 mt-1">{formatDate(project.endDate)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-600">Last Updated</label>
                    <p className="text-base text-gray-900 mt-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(project.lastUpdated) || 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Status & Progress */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Status & Progress</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Current Status</label>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                          {project.status || 'Unknown'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">PIC (Person in Charge)</label>
                      <div className="mt-2 flex items-center">
                        <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-cyan-600" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-gray-900">{project.pic || 'Unassigned'}</p>
                          <p className="text-sm text-gray-600">Project Manager</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Progress Update</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Latest Progress</label>
                      <p className="text-base text-gray-900 mt-2 bg-white p-3 rounded-lg border">
                        {project.progressUpdate || 'No progress updates available'}
                      </p>
                    </div>
                    {project.issues && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1 text-orange-500" />
                          Issues & Problems
                        </label>
                        <p className="text-base text-gray-900 mt-2 bg-orange-50 p-3 rounded-lg border border-orange-200">
                          {project.issues}
                        </p>
                      </div>
                    )}
                    {project.pendingItems && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Pending Items</label>
                        <p className="text-base text-gray-900 mt-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                          {project.pendingItems}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors duration-150"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 font-medium transition-all duration-150 shadow-lg">
              Edit Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;