import React from 'react';
import ProgressCard from './ProgressCard';
import { FolderKanban, Settings, Search } from 'lucide-react';
import useProjectsData from '../../../hooks/useProjectsData';

const ProgressCardDemo = () => {
  const { stats = {} } = useProjectsData();

  const projek = stats.projekProjects?.toString() || '0';
  const maintenance = stats.maintenanceProjects?.toString() || '0';
  const poc = stats.pocProjects?.toString() || '0';

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Progress Overview</h2>

      <div className="flex flex-col sm:flex-row justify-between gap-5">
        <ProgressCard
          className="flex-1 min-w-[250px]"
          title="Projek"
          value={projek}
          icon={FolderKanban}
          type="projects"
        />
        <ProgressCard
          className="flex-1 min-w-[250px]"
          title="Maintenance"
          value={maintenance}
          icon={Settings}
          type="maintenance"
        />
        <ProgressCard
          className="flex-1 min-w-[250px]"
          title="POC Projects"
          value={poc}
          icon={Search}
          type="poc"
        />
      </div>
    </div>
  );
};

export default ProgressCardDemo;

