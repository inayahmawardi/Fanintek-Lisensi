import React from 'react';
import { Eye, Edit, Trash2, AlertCircle } from 'lucide-react';

// Normalize various status strings into canonical values used by the UI
const normalizeStatus = (raw) => {
	if (!raw) return '';
	const s = raw.toString().trim().toLowerCase();
	if (s.includes('good')) return 'good';
	if (s.includes('on track')) return 'on track';
	if (s.includes('delay') || s.includes('tunda')) return 'delay';
	if (s.includes('not good') || s.includes('notgood') || s.includes('not-good')) return 'not good';
	return s;
};

const ProgressTable = ({ projects, onProjectClick, onEdit, onDelete }) => {
	const getStatusBadge = (status) => {
		const s = normalizeStatus(status);
		if (!s) return null;
		if (s === 'good') return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">🟢 Good</span>;
		if (s === 'not good') return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">🔴 Not Good</span>;
		if (s === 'on track') return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">🟡 On Track</span>;
		if (s === 'delay') return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">🔴 Delay</span>;
		return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">Unknown</span>;
	};

	const formatDate = (dateString) => {
		if (!dateString) return '-';
		try {
			return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
		} catch {
			return dateString;
		}
	};

	const getWorkTypeBadge = (type) => {
		if (!type) return <span className="text-gray-400">-</span>;
		const t = type.toLowerCase();
		if (t.includes('maintenance')) return <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">Maintenance</span>;
		if (t.includes('proyek') || t.includes('project')) return <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Proyek</span>;
		if (t.includes('poc')) return <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">POC</span>;
		return <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">{type}</span>;
	};

	const getProgressBar = (progressText) => {
		if (!progressText) return <span className="text-gray-400">-</span>;
		const match = progressText.match(/(\d+)%/);
		const percent = match ? parseInt(match[1], 10) : 0;
		let barColor = 'bg-green-400';
		if (percent < 100 && percent >= 70) barColor = 'bg-yellow-400';
		if (percent < 70) barColor = 'bg-yellow-400';
		if (progressText.toLowerCase().includes('tunda') || progressText.toLowerCase().includes('delay')) barColor = 'bg-red-400';
		return (
			<div>
				<div className="flex items-center justify-between mb-1">
					<span className="text-xs font-medium text-gray-700">{progressText}</span>
					<span className="text-xs font-medium text-gray-500">{percent}%</span>
				</div>
				<div className="w-full bg-gray-100 rounded-full h-2">
					<div className={`${barColor} h-2 rounded-full transition-all duration-300`} style={{ width: `${percent}%` }}></div>
				</div>
			</div>
		);
	};

	const cell = (val) => val || <span className="text-gray-400">-</span>;

	return (
		<div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto transition-all duration-300 hover:shadow-lg">
			<table className="w-full min-w-[1200px] text-sm font-inter">
				<thead className="sticky top-0 z-10 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
					<tr>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Nama Client / Perusahaan</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Nama Proyek</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Kode Proyek</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Timeline</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Jenis Pekerjaan</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Update Progres</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Permasalahan</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Pendingan</th>
						<th colSpan={3} className="px-6 py-4 text-xs font-semibold text-center text-cyan-900 border-l border-cyan-200 uppercase tracking-wide">Short Term</th>
						<th colSpan={3} className="px-6 py-4 text-xs font-semibold text-center text-blue-900 border-l border-blue-200 uppercase tracking-wide">Long Term</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Tanggal Update</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-left uppercase tracking-wide">Status</th>
						<th rowSpan={2} className="px-6 py-4 text-xs font-semibold text-cyan-900 text-center uppercase tracking-wide min-w-[160px]">Aksi</th>
					</tr>
					<tr>
						<th className="px-4 py-3 text-xs font-medium text-cyan-800 text-center">PIC</th>
						<th className="px-4 py-3 text-xs font-medium text-cyan-800 text-center">Estimasi</th>
						<th className="px-4 py-3 text-xs font-medium text-cyan-800 text-center">Action</th>
						<th className="px-4 py-3 text-xs font-medium text-blue-800 text-center border-l border-blue-200">PIC</th>
						<th className="px-4 py-3 text-xs font-medium text-blue-800 text-center">Estimasi</th>
						<th className="px-4 py-3 text-xs font-medium text-blue-800 text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{projects && projects.length > 0 ? (
						projects.map((p, idx) => (
							<tr
								key={p.id || idx}
								className={`transition-all duration-200 ${
									idx % 2 === 0
										? 'bg-white hover:bg-cyan-50'
										: 'bg-gray-50 hover:bg-cyan-50'
								}`}
							>
								<td className="px-4 py-4 align-top text-left">{cell(p.clientName)}</td>
								<td className="px-4 py-4 align-top text-left">{cell(p.projectName)}</td>
								<td className="px-4 py-4 align-top text-left">{cell(p.projectCode)}</td>
								<td className="px-4 py-4 align-top text-left">{p.startDate && p.endDate ? `${formatDate(p.startDate)} - ${formatDate(p.endDate)}` : '-'}</td>
								<td className="px-4 py-4 align-top text-left">{getWorkTypeBadge(p.workType)}</td>
								<td className="px-4 py-4 align-top text-left">{getProgressBar(p.progressUpdate)}</td>
								<td className="px-4 py-4 align-top text-left">{cell(p.issues)}</td>
								<td className="px-4 py-4 align-top text-left">{cell(p.pendingItems)}</td>

								<td className="px-4 py-4 align-top text-left border-l border-cyan-100">{cell(p.picShort)}</td>
								<td className="px-4 py-4 align-top text-left">{cell(p.estimateShort)}</td>
								<td className="px-4 py-4 align-top text-left">{cell(p.actionShort)}</td>

								<td className="px-4 py-4 align-top text-left border-l border-blue-100">{cell(p.picLong)}</td>
								<td className="px-4 py-4 align-top text-left">{cell(p.estimateLong)}</td>
								<td className="px-4 py-4 align-top text-left">{cell(p.actionLong)}</td>

								<td className="px-4 py-4 align-top text-left">{formatDate(p.lastUpdated)}</td>
								<td className="px-4 py-4 align-top text-left">{getStatusBadge(p.status)}</td>

								<td className="px-4 py-4 text-center space-x-2 min-w-[160px]">
									<button onClick={() => onProjectClick?.(p)} className="inline-flex items-center p-1.5 text-xs rounded bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors duration-200"><Eye className="h-4 w-4" /></button>
									<button onClick={() => onEdit?.(p)} className="inline-flex items-center p-1.5 text-xs rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"><Edit className="h-4 w-4" /></button>
									<button onClick={() => onDelete?.(p)} className="inline-flex items-center p-1.5 text-xs rounded bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200"><Trash2 className="h-4 w-4" /></button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={18} className="px-8 py-12 text-center">
								<div className="flex flex-col items-center text-center">
									<div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
										<AlertCircle className="h-8 w-8 text-gray-400" />
									</div>
									<p className="text-gray-600 text-sm font-medium">Tidak ada proyek yang ditemukan</p>
									<p className="text-gray-400 text-xs mt-1">Tambahkan proyek baru untuk memulai pemantauan</p>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ProgressTable;
