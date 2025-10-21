import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

export default function IncidentManagement() {
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const navigate = useNavigate();
  const stats = {
    total_incidents: 12,
    open_incidents: 3,
    in_progress_incidents: 2,
    resolved_incidents: 7,
    critical_incidents: 1,
    high_incidents: 2,
    overdue_incidents: 1,
    due_next_7_days_incidents: 2,
  };

  const incidents = [
    {
      id: 1,
      ticket_id: 'INC-001',
      company_name: 'PT. Bank Negara Indonesia',
      nama_aplikasi: 'Sistem Keuangan',
      problem: 'Error login user',
      status: 'Open',
      priority: 'High',
      deadline: '2025-10-25',
      reporter_name: 'Cici',
      assigned_to: 'Budi',
      created_at: '2025-10-20 09:00',
    },
  ];

  return (
    <DashboardLayout
      userRole="admin"
      activeMenu="Incident Management"
      headerTitle="Incident Management"
      headerSubtitle="Monitor dan kelola semua incident sistem"
    >
      <div className="min-h-screen" style={{ background: '#f8f9fa', padding: '24px' }}>
        <style>{`
          * { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          
          .stat-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border: 1px solid #e5e7eb;
          }

          .stat-card:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
          }

          .icon-wrap {
            width: 48px;
            height: 48px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }

          .stat-card .meta {
            flex: 1;
          }

          .stat-card .label {
            font-size: 12px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }

          .stat-card .value {
            font-size: 28px;
            font-weight: 700;
            color: #1f2937;
          }

          .card {
            background: white;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            animation: slideIn 0.3s ease-out;
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .card-header {
            background: #f8f9fa;
            padding: 16px 20px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
          }

          .card-header h6 {
            margin: 0;
            font-weight: 700;
            color: #1f2937;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .card-body {
            padding: 20px;
          }

          .form-label {
            font-weight: 600;
            color: #374151;
            font-size: 13px;
            margin-bottom: 6px;
            display: block;
          }

          .form-control,
          .form-select {
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 10px 12px;
            font-size: 13px;
            transition: all 0.3s ease;
            background: white;
            width: 100%;
          }

          .form-control:focus,
          .form-select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .priority-card {
            background: white;
            border-radius: 12px;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #e5e7eb;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
          }

          .priority-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          }

          .priority-card.critical {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border-color: #fca5a5;
          }

          .priority-card.critical .label {
            color: #991b1b;
          }

          .priority-card.critical .value {
            color: #dc2626;
          }

          .priority-card.warning {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-color: #fcd34d;
          }

          .priority-card.warning .label {
            color: #92400e;
          }

          .priority-card.warning .value {
            color: #d97706;
          }

          .priority-card.info {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-color: #93c5fd;
          }

          .priority-card.info .label {
            color: #0c4a6e;
          }

          .priority-card.info .value {
            color: #0284c7;
          }

          .table-responsive {
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          thead tr {
            background: #f8f9fa;
            border-bottom: 2px solid #e5e7eb;
          }

          th {
            padding: 12px;
            text-align: left;
            font-weight: 700;
            color: #374151;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }

          td {
            padding: 12px;
            border-bottom: 1px solid #f3f4f6;
            font-size: 13px;
            color: #374151;
          }

          tbody tr:hover {
            background: #f9fafb;
          }

          tbody tr:last-child td {
            border-bottom: none;
          }

          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }

          .badge.open {
            background: #fee2e2;
            color: #991b1b;
          }

          .badge.resolved {
            background: #dcfce7;
            color: #166534;
          }

          .badge.critical {
            background: #fee2e2;
            color: #991b1b;
          }

          .badge.high {
            background: #fef3c7;
            color: #92400e;
          }

          .badge.medium {
            background: #dbeafe;
            color: #0c4a6e;
          }

          .badge.low {
            background: #dcfce7;
            color: #166534;
          }

          .btn-group {
            display: flex;
            gap: 4px;
          }

          .btn-icon {
            padding: 6px 10px;
            border: 1px solid #e5e7eb;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #374151;
          }

          .btn-icon:hover {
            background: #f3f4f6;
            transform: translateY(-1px);
          }

          .btn-icon.danger:hover {
            background: #fee2e2;
            color: #dc2626;
          }

          .btn-icon.warning:hover {
            background: #fef3c7;
            color: #d97706;
          }

          .btn-icon.success:hover {
            background: #dcfce7;
            color: #16a34a;
          }

          .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
          }

          .row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 12px;
          }

          .col-12 {
            grid-column: 1 / -1;
          }

          .action-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }

          .action-buttons {
            display: flex;
            gap: 8px;
          }

          @media (max-width: 768px) {
            .row { grid-template-columns: 1fr; }
            table { font-size: 12px; }
            th, td { padding: 8px; }
            .action-header {
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}</style>

        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Action Header: Buat Incident Button */}
          <div className="action-header">
            <div></div>
            <div className="action-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate('/incident/form')}
              >
                <i className="bi bi-plus-circle"></i> Buat Incident
              </button>
            </div>
          </div>
          {/* Statistik Cards Row */}
          <div className="row" style={{ marginBottom: '24px' }}>
            <div className="col-12" style={{ gridColumn: 'span 1' }}>
              <div className="stat-card">
                <div className="icon-wrap" style={{ background: '#ede9fe', color: '#667eea' }}>
                  <i className="bi bi-list-ul"></i>
                </div>
                <div className="meta">
                  <div className="label">Total Incident</div>
                  <div className="value">{stats.total_incidents}</div>
                </div>
              </div>
            </div>

            <div className="col-12" style={{ gridColumn: 'span 1' }}>
              <div className="stat-card">
                <div className="icon-wrap" style={{ background: '#fee2e2', color: '#dc2626' }}>
                  <i className="bi bi-exclamation-circle"></i>
                </div>
                <div className="meta">
                  <div className="label" style={{ color: '#991b1b' }}>Incident Terbuka</div>
                  <div className="value">{stats.open_incidents}</div>
                </div>
              </div>
            </div>

            <div className="col-12" style={{ gridColumn: 'span 1' }}>
              <div className="stat-card">
                <div className="icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
                  <i className="bi bi-hourglass-split"></i>
                </div>
                <div className="meta">
                  <div className="label">Sedang Proses</div>
                  <div className="value">{stats.in_progress_incidents}</div>
                </div>
              </div>
            </div>

            <div className="col-12" style={{ gridColumn: 'span 1' }}>
              <div className="stat-card">
                <div className="icon-wrap" style={{ background: '#dcfce7', color: '#16a34a' }}>
                  <i className="bi bi-check-circle"></i>
                </div>
                <div className="meta">
                  <div className="label">Terselesaikan</div>
                  <div className="value">{stats.resolved_incidents}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Priority & Alert Cards */}
          <div className="row" style={{ marginBottom: '24px' }}>
            <div className="col-12" style={{ gridColumn: 'span 1' }}>
              <div className="priority-card critical">
                <div>
                  <div className="label">Critical Priority</div>
                  <div className="value">{stats.critical_incidents}</div>
                </div>
                <i className="bi bi-lightning fa-2x"></i>
              </div>
            </div>

            <div className="col-12" style={{ gridColumn: 'span 1' }}>
              <div className="priority-card warning">
                <div>
                  <div className="label">High Priority</div>
                  <div className="value">{stats.high_incidents}</div>
                </div>
                <i className="bi bi-arrow-up fa-2x"></i>
              </div>
            </div>

            <div className="col-12" style={{ gridColumn: 'span 1' }}>
              <div className="priority-card critical">
                <div>
                  <div className="label">Overdue</div>
                  <div className="value">{stats.overdue_incidents}</div>
                </div>
                <i className="bi bi-alarm fa-2x"></i>
              </div>
            </div>

            <div className="col-12" style={{ gridColumn: 'span 1' }}>
              <div className="priority-card info">
                <div>
                  <div className="label">Deadline in 7 day</div>
                  <div className="value">{stats.due_next_7_days_incidents}</div>
                </div>
                <i className="bi bi-calendar-event fa-2x"></i>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div style={{ marginBottom: '24px' }}>
            <div className="card">
              <div className="card-header">
                <h6>Filter & Search Incidents</h6>
                <button className="btn-icon">
                  <i className="bi bi-funnel"></i> Filters
                </button>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <label className="form-label">Search</label>
                    <input type="text" className="form-control" placeholder="Ticket ID, aplikasi, masalah..." />
                  </div>
                  <div>
                    <label className="form-label">Status</label>
                    <select className="form-select">
                      <option value="">All Statuses</option>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Priority</label>
                    <select className="form-select">
                      <option value="">All Priorities</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                    <button className="btn-primary">
                      <i className="bi bi-search"></i> Filter
                    </button>
                    <button className="btn-icon">
                      <i className="bi bi-x-circle"></i> Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Incidents Table */}
          <div style={{ marginBottom: '32px' }}>
            <div className="card">
              <div className="card-header">
                <h6>
                  <i className="bi bi-table"></i>
                  Daftar Incidents
                </h6>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => navigate('/incident/form')}
                  >
                    <i className="bi bi-plus-circle"></i> Buat Incident
                  </button>
                  <button className="btn-icon success">
                    <i className="bi bi-file-word"></i> Export Selected
                  </button>
                  <button className="btn-icon">
                    <i className="bi bi-download"></i> Export
                  </button>
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th width="40"><input type="checkbox" /></th>
                        <th>ID Tiket</th>
                        <th>Perusahaan</th>
                        <th>Aplikasi</th>
                        <th>Masalah</th>
                        <th>Status</th>
                        <th>Prioritas</th>
                        <th>Batas Waktu</th>
                        <th>Pelapor</th>
                        <th>Ditugaskan</th>
                        <th>Dibuat</th>
                        <th width="120">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incidents.length === 0 ? (
                        <tr>
                          <td colSpan="12" style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                            <i className="bi bi-inbox" style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }}></i>
                            Tidak ada incident ditemukan
                          </td>
                        </tr>
                      ) : incidents.map(incident => (
                        <tr key={incident.id}>
                          <td><input type="checkbox" /></td>
                          <td><strong>{incident.ticket_id}</strong></td>
                          <td>{incident.company_name}</td>
                          <td>{incident.nama_aplikasi}</td>
                          <td>{incident.problem}</td>
                          <td><span className={`badge ${incident.status === 'Open' ? 'open' : 'resolved'}`}>{incident.status}</span></td>
                          <td><span className={`badge ${incident.priority === 'Critical' ? 'critical' : incident.priority === 'High' ? 'high' : incident.priority === 'Medium' ? 'medium' : 'low'}`}>{incident.priority}</span></td>
                          <td>{incident.deadline}</td>
                          <td>{incident.reporter_name}</td>
                          <td>{incident.assigned_to}</td>
                          <td>{incident.created_at}</td>
                          <td>
                            <div className="btn-group">
                              <button className="btn-icon warning" title="Edit"><i className="bi bi-pencil"></i></button>
                              <button className="btn-icon success" title="Export Word"><i className="bi bi-file-word"></i></button>
                              <button className="btn-icon" title="Export PDF"><i className="bi bi-filetype-pdf"></i></button>
                              <button className="btn-icon" title="Print"><i className="bi bi-printer"></i></button>
                              <button className="btn-icon danger" title="Delete"><i className="bi bi-trash"></i></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}