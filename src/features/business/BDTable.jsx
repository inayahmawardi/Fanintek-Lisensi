import React, { useState, useEffect } from 'react';
import BDDetail from './BDDetail';
import DBPrint from './DBPrint';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Download, Printer, Trash2, ChevronDown } from 'lucide-react';

const downloadCsv = (items) => {
  if (!items || items.length === 0) return;
  const headers = Object.keys(items[0]);
  const rows = items.map(it => headers.map(h => `"${(it[h] ?? '').toString().replace(/"/g, '""')}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'business-development.csv';
  a.click();
  URL.revokeObjectURL(url);
};

const BDTable = ({ onDelete }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [printData, setPrintData] = useState(null);
  const [sortBy, setSortBy] = useState('nama_proyek');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'business_development'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };
    fetchData();
  }, []);

  const filteredItems = items.filter(it =>
    (it.nama_proyek?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (it.nama_client?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'nama_proyek') return a.nama_proyek?.localeCompare(b.nama_proyek);
    if (sortBy === 'nama_client') return a.nama_client?.localeCompare(b.nama_client);
    return 0;
  });

  return (
    <div style={styles.container}>
      <style>{`
        * { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }

        .page-container {
          min-height: 100vh;
          background: white;
          padding: 40px 16px;
        }

        .wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          color: white;
          margin-bottom: 32px;
        }

        .page-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .page-header p {
          font-size: 15px;
          opacity: 0.95;
        }

        .table-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          animation: slideIn 0.4s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-header {
          padding: 28px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .card-header h2 {
          font-size: 22px;
          font-weight: 700;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .btn-export {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-export:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .btn-print {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-print:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .search-bar {
          padding: 20px 28px;
          border-bottom: 1px solid #e5e7eb;
        }

        .search-input {
          width: 100%;
          max-width: 400px;
          padding: 10px 14px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f8f9fa;
        }

        th {
          padding: 14px 16px;
          text-align: left;
          font-weight: 700;
          color: #374151;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid #e5e7eb;
          cursor: pointer;
          user-select: none;
          transition: all 0.3s ease;
        }

        th:hover {
          background: #f0f0f0;
        }

        td {
          padding: 14px 16px;
          border-bottom: 1px solid #f0f0f0;
          color: #374151;
          font-size: 13px;
        }

        tbody tr {
          transition: all 0.3s ease;
        }

        tbody tr:hover {
          background: rgba(102, 126, 234, 0.05);
        }

        .idx-col {
          font-weight: 700;
          color: #f59e0b;
          width: 40px;
          text-align: center;
        }

        .project-col {
          font-weight: 600;
          color: #1f2937;
        }

        .client-col {
          color: #6b7280;
        }

        .timeline-col {
          color: #6b7280;
          font-size: 12px;
        }

        .notes-col {
          color: #9ca3af;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .action-cell {
          text-align: center;
        }

        .btn-delete {
          padding: 8px 12px;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .btn-delete:hover {
          background: #fecaca;
          transform: scale(1.05);
        }

        .empty-state {
          padding: 40px;
          text-align: center;
          color: #9ca3af;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .empty-text {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
        }

        .expanded-row {
          background: rgba(102, 126, 234, 0.05);
        }

        .expanded-content {
          padding: 20px 16px;
          background: #f8f9fa;
          border-top: 1px solid #e5e7eb;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #667eea;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .expand-btn.active {
          transform: rotate(180deg);
        }

        .stat-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 12px;
        }

        .stat-item {
          background: white;
          padding: 12px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
        }

        .stat-label {
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          word-break: break-all;
        }

        @media print {
          .card-header { color: #1f2937; background: white; }
          .btn-export, .btn-print, .search-bar { display: none; }
        }

        @media (max-width: 768px) {
          .card-header { padding: 16px; }
          .search-bar { padding: 16px; }
          table { font-size: 12px; }
          td, th { padding: 10px 8px; }
        }
      `}</style>

      <div className="page-container">
        <div className="wrapper">
          <div className="page-header">
            <h1>📊 Daftar Prospek Business Development</h1>
            <p>Kelola dan monitor semua prospek proyek Anda</p>
          </div>

          <div className="table-card">
            <div className="card-header">
              <h2>📋 Prospek Terdaftar</h2>
              <div className="header-actions">
                <button 
                  className="btn btn-export" 
                  onClick={() => downloadCsv(sortedItems)}
                  title="Download data dalam format CSV"
                >
                  <Download size={16} /> Export CSV
                </button>
                <button 
                  className="btn btn-print" 
                  onClick={() => window.print()}
                  title="Cetak halaman"
                >
                  <Printer size={16} /> Print
                </button>
              </div>
            </div>

            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 Cari proyek atau client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="idx-col">#</th>
                    <th onClick={() => setSortBy('projectName')} title="Klik untuk sort">
                      📌 Nama Proyek
                    </th>
                    <th onClick={() => setSortBy('clientName')} title="Klik untuk sort">
                      👥 Client
                    </th>
                    <th>📞 PIC</th>
                    <th>📅 Timeline</th>
                    <th>📝 Catatan</th>
                    <th style={{textAlign: 'center'}}>⚙️ Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems && sortedItems.length > 0 ? (
                    sortedItems.map((it, idx) => (
                      <React.Fragment key={it.id}>
                        <tr className={expandedId === it.id ? 'expanded-row' : ''}>
                          <td className="idx-col">{idx + 1}</td>
                          <td className="project-col">{it.nama_proyek || '-'}</td>
                          <td className="client-col">{it.nama_client || '-'}</td>
                          <td>{it.pic_sales || '-'}</td>
                          <td className="timeline-col">{it.durasi_pengerjaan || '-'}</td>
                          <td className="notes-col" title={it.ringkasan_proyek_poc}>{it.ringkasan_proyek_poc || '-'}</td>
                          <td className="action-cell" style={{display:'flex',gap:8}}>
                            <button
                              className="btn btn-info btn-sm"
                              title="Lihat Detail"
                              onClick={() => {
                                setDetailData(it);
                                setShowDetail(true);
                              }}
                            >
                              👁️ Detail
                            </button>
                            <button
                              className="btn btn-warning btn-sm"
                              title="Edit Data"
                              onClick={() => alert('Fitur edit belum diimplementasikan')}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              title="Print PDF"
                              onClick={() => setPrintData(it)}
                            >
                              🖨️ PDF
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => onDelete(it.id)}
                              title="Hapus prospek ini"
                            >
                              <Trash2 size={14} /> Hapus
                            </button>
                          </td>
                        </tr>
                        {expandedId === it.id && (
                          <tr className="expanded-row">
                            <td colSpan={7}>
                              <div className="expanded-content">
                                <div className="stat-row">
                                  <div className="stat-item">
                                    <div className="stat-label">Kode Prospek</div>
                                    <div className="stat-value">{it.prospectCode || '-'}</div>
                                  </div>
                                  <div className="stat-item">
                                    <div className="stat-label">Divisi Teknis</div>
                                    <div className="stat-value">{it.division || '-'}</div>
                                  </div>
                                  <div className="stat-item">
                                    <div className="stat-label">Durasi Pengerjaan</div>
                                    <div className="stat-value">{it.duration || '-'}</div>
                                  </div>
                                  <div className="stat-item">
                                    <div className="stat-label">PIC Client</div>
                                    <div className="stat-value">{it.picClient || '-'}</div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>
                        <div className="empty-state">
                          <div className="empty-icon">📭</div>
                          <p className="empty-text">Tidak ada data prospek</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {sortedItems && sortedItems.length > 0 && (
              <div style={{padding: '16px 28px', background: '#f8f9fa', borderTop: '1px solid #e5e7eb', fontSize: '13px', color: '#6b7280'}}>
                📊 Total: <strong>{sortedItems.length}</strong> prospek
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal Detail */}
      {showDetail && detailData && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.2)',zIndex:9999,overflow:'auto'}}>
          <div style={{maxWidth:1100,margin:'40px auto',background:'#fff',borderRadius:16,boxShadow:'0 8px 32px rgba(0,0,0,0.15)',padding:32,position:'relative'}}>
            <button className="btn btn-danger btn-sm" style={{position:'absolute',top:16,right:16}} onClick={()=>setShowDetail(false)}>Tutup</button>
            <BDDetail
              prospect={detailData}
              documents={detailData.docs || []}
              team={detailData.team || []}
              milestones={detailData.milestones || []}
            />
          </div>
        </div>
      )}
      {/* Modal Print PDF */}
      {printData && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.2)',zIndex:9999,overflow:'auto'}}>
          <div style={{maxWidth:1100,margin:'40px auto',background:'#fff',borderRadius:16,boxShadow:'0 8px 32px rgba(0,0,0,0.15)',padding:32,position:'relative'}}>
            <button className="btn btn-danger btn-sm" style={{position:'absolute',top:16,right:16}} onClick={()=>setPrintData(null)}>Tutup</button>
            <DBPrint
              prospect={printData}
              documents={printData.docs || []}
              team={printData.team || []}
              milestones={printData.milestones || []}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BDTable;

const styles = {
  container: {
    width: '100%'
  }
};