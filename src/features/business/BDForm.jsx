import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const initialForm = {
  prospect_code: '',
  nama_proyek: '',
  nama_client: '',
  divisi_teknis: '',
  pic_sales: '',
  pic_client: '',
  durasi_pengerjaan: '',
  ringkasan_proyek_poc: '',
  teknologi_client: '',
  output_goals: '',
  masalah_utama_client: '',
  solusi_ditawarkan: '',
  fitur_modul_dibutuhkan: '',
  catatan_risiko: '',
  start_actions: '',
  sign_sales: '',
  sign_business_development: '',
  sign_project_manager: '',
  sign_tl_divisi: '',
  sign_general_manager: '',
};

export default function BDForm({ onSave }) {
  const [form, setForm] = useState(initialForm);
  const [docs, setDocs] = useState([{ doc_name: '', doc_status: 'Ok', doc_notes: '' }]);
  const [team, setTeam] = useState([{ team_name: '', team_role: '' }]);
  const [milestones, setMilestones] = useState([{ ms_key: '', ms_start: '', ms_end: '' }]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addDocRow = () => setDocs([...docs, { doc_name: '', doc_status: 'Ok', doc_notes: '' }]);
  const removeDocRow = (idx) => setDocs(docs.filter((_, i) => i !== idx));
  const handleDocChange = (idx, e) => {
    const newDocs = [...docs];
    newDocs[idx][e.target.name] = e.target.value;
    setDocs(newDocs);
  };

  const addTeamRow = () => setTeam([...team, { team_name: '', team_role: '' }]);
  const removeTeamRow = (idx) => setTeam(team.filter((_, i) => i !== idx));
  const handleTeamChange = (idx, e) => {
    const newTeam = [...team];
    newTeam[idx][e.target.name] = e.target.value;
    setTeam(newTeam);
  };

  const addMsRow = () => setMilestones([...milestones, { ms_key: '', ms_start: '', ms_end: '' }]);
  const removeMsRow = (idx) => setMilestones(milestones.filter((_, i) => i !== idx));
  const handleMsChange = (idx, e) => {
    const newMs = [...milestones];
    newMs[idx][e.target.name] = e.target.value;
    setMilestones(newMs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama_proyek || !form.nama_client) {
      alert('Nama proyek dan client wajib diisi');
      return;
    }
    const data = {
      ...form,
      docs,
      team,
      milestones,
      createdAt: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, 'business_development'), data);
      alert('Data berhasil disimpan!');
      if (onSave) onSave(data);
      setForm(initialForm);
      setDocs([{ doc_name: '', doc_status: 'Ok', doc_notes: '' }]);
      setTeam([{ team_name: '', team_role: '' }]);
      setMilestones([{ ms_key: '', ms_start: '', ms_end: '' }]);
    } catch (err) {
      alert('Gagal simpan data: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        * { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        
        body { margin: 0; }

        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 16px;
        }

        .form-wrapper { max-width: 1000px; margin: 0 auto; }

        .form-header {
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }

        .form-header h1 {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 8px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .form-header p {
          font-size: 15px;
          opacity: 0.95;
          margin: 0;
        }

        .section {
          background: white;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          animation: slideIn 0.4s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 3px solid #667eea;
        }

        .section-title h2 {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .grid-full { grid-column: 1 / -1; }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          font-size: 13px;
        }

        .input-group .required {
          color: #ef4444;
        }

        .input-group input,
        .input-group textarea,
        .input-group select {
          padding: 12px 14px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: #fafbfc;
          font-family: inherit;
        }

        .input-group input:focus,
        .input-group textarea:focus,
        .input-group select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .input-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .input-group input:read-only {
          background: #f3f4f6;
          cursor: not-allowed;
        }

        .table-wrapper {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-bottom: 20px;
          border: 1px solid #e5e7eb;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        }

        th {
          padding: 14px;
          text-align: left;
          font-weight: 700;
          color: #374151;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border-bottom: 2px solid #d1d5db;
        }

        td {
          padding: 14px;
          border-bottom: 1px solid #f0f0f0;
        }

        tbody tr:hover {
          background: rgba(102, 126, 234, 0.02);
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        .table-num {
          text-align: center;
          font-weight: 700;
          color: #667eea;
          width: 40px;
        }

        .btn {
          padding: 10px 14px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-add {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-top: 12px;
        }

        .btn-add:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
          padding: 8px 10px;
          border-radius: 6px;
        }

        .btn-delete:hover {
          background: #fecaca;
          transform: scale(1.05);
        }

        .btn-back {
          background: #e5e7eb;
          color: #374151;
          padding: 14px 28px;
          font-size: 15px;
        }

        .btn-back:hover {
          background: #d1d5db;
          transform: translateX(-2px);
        }

        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 14px 32px;
          font-size: 15px;
          min-width: 140px;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          margin-top: 40px;
        }

        .small-text {
          color: #6b7280;
          font-size: 13px;
          margin-top: 6px;
        }

        @media (max-width: 768px) {
          .section { padding: 20px; }
          .grid { grid-template-columns: 1fr; }
          .form-header h1 { font-size: 28px; }
        }
      `}</style>

      <div className="form-wrapper">
        <div className="form-header">
          <h1>📋 Tambah Prospek Baru</h1>
          <p>Form Business Development – Lengkapi data prospek dengan detail yang akurat</p>
        </div>

        <div onSubmit={handleSubmit} style={{display: 'contents'}}>
          {/* Informasi Dasar */}
          <div className="section">
            <div className="section-title">
              <h2>📌 Informasi Dasar</h2>
              <span className="badge">WAJIB</span>
            </div>
            <div className="grid">
              <div className="input-group">
                <label>Kode Prospek</label>
                <input name="prospect_code" value={form.prospect_code} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Nama Proyek <span className="required">*</span></label>
                <input required name="nama_proyek" value={form.nama_proyek} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Nama Client <span className="required">*</span></label>
                <input required name="nama_client" value={form.nama_client} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Informasi Kontak */}
          <div className="section">
            <div className="section-title">
              <h2>👥 Informasi Kontak & Tim</h2>
            </div>
            <div className="grid">
              <div className="input-group">
                <label>Divisi Teknis</label>
                <input name="divisi_teknis" value={form.divisi_teknis} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>PIC Sales</label>
                <input name="pic_sales" value={form.pic_sales} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>PIC Client</label>
                <input name="pic_client" value={form.pic_client} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Durasi Pengerjaan</label>
                <input name="durasi_pengerjaan" value={form.durasi_pengerjaan} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Deskripsi Proyek */}
          <div className="section">
            <div className="section-title">
              <h2>📝 Deskripsi Proyek</h2>
            </div>
            <div className="grid grid-full">
              <div className="input-group">
                <label>Ringkasan Proyek / POC</label>
                <textarea name="ringkasan_proyek_poc" value={form.ringkasan_proyek_poc} onChange={handleChange} />
              </div>
            </div>
            <div className="grid">
              <div className="input-group">
                <label>Teknologi yang Digunakan</label>
                <textarea name="teknologi_client" value={form.teknologi_client} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Output / Goals Proyek</label>
                <textarea name="output_goals" value={form.output_goals} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Masalah Utama Client</label>
                <textarea name="masalah_utama_client" value={form.masalah_utama_client} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Solusi yang Ditawarkan</label>
                <textarea name="solusi_ditawarkan" value={form.solusi_ditawarkan} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Fitur / Modul Dibutuhkan</label>
                <textarea name="fitur_modul_dibutuhkan" value={form.fitur_modul_dibutuhkan} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Catatan / Risiko</label>
                <textarea name="catatan_risiko" value={form.catatan_risiko} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Dokumen */}
          <div className="section">
            <div className="section-title">
              <h2>📎 Dokumen Lampiran</h2>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="table-num">#</th>
                    <th>Nama Dokumen</th>
                    <th style={{width: 120}}>Status</th>
                    <th>Catatan</th>
                    <th style={{width: 40}}></th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc, idx) => (
                    <tr key={idx}>
                      <td className="table-num">{idx+1}</td>
                      <td><input name="doc_name" value={doc.doc_name} onChange={e=>handleDocChange(idx,e)} required /></td>
                      <td><select name="doc_status" value={doc.doc_status} onChange={e=>handleDocChange(idx,e)}><option>Ok</option><option>Tidak</option></select></td>
                      <td><input name="doc_notes" value={doc.doc_notes} onChange={e=>handleDocChange(idx,e)} /></td>
                      <td><button type="button" className="btn btn-delete" onClick={()=>removeDocRow(idx)}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="btn btn-add" onClick={addDocRow}>+ Tambah Dokumen</button>
          </div>

          {/* Tim */}
          <div className="section">
            <div className="section-title">
              <h2>👨‍💼 Tim yang Mengerjakan</h2>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="table-num">#</th>
                    <th>Nama</th>
                    <th style={{width: 160}}>Role</th>
                    <th style={{width: 40}}></th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((tm, idx) => (
                    <tr key={idx}>
                      <td className="table-num">{idx+1}</td>
                      <td><input name="team_name" value={tm.team_name} onChange={e=>handleTeamChange(idx,e)} required /></td>
                      <td><input name="team_role" value={tm.team_role} onChange={e=>handleTeamChange(idx,e)} /></td>
                      <td><button type="button" className="btn btn-delete" onClick={()=>removeTeamRow(idx)}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="btn btn-add" onClick={addTeamRow}>+ Tambah Anggota</button>
          </div>

          {/* Milestone */}
          <div className="section">
            <div className="section-title">
              <h2>📅 Milestone Pengerjaan</h2>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="table-num">#</th>
                    <th>Key Implementasi</th>
                    <th style={{width: 140}}>Mulai</th>
                    <th style={{width: 140}}>Selesai</th>
                    <th style={{width: 40}}></th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map((ms, idx) => (
                    <tr key={idx}>
                      <td className="table-num">{idx+1}</td>
                      <td><input name="ms_key" value={ms.ms_key} onChange={e=>handleMsChange(idx,e)} required /></td>
                      <td><input type="date" name="ms_start" value={ms.ms_start} onChange={e=>handleMsChange(idx,e)} /></td>
                      <td><input type="date" name="ms_end" value={ms.ms_end} onChange={e=>handleMsChange(idx,e)} /></td>
                      <td><button type="button" className="btn btn-delete" onClick={()=>removeMsRow(idx)}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="btn btn-add" onClick={addMsRow}>+ Tambah Milestone</button>
          </div>

          {/* Start Actions */}
          <div className="section">
            <div className="section-title">
              <h2>🚀 Langkah Awal Proyek</h2>
            </div>
            <div className="grid grid-full">
              <div className="input-group">
                <label>Start Proyek / POC</label>
                <textarea name="start_actions" value={form.start_actions} onChange={handleChange} placeholder="1. Request Server&#10;2. Assessment&#10;3. ..." style={{minHeight: 100}} />
                <p className="small-text">Isi daftar berurutan (setiap baris satu langkah)</p>
              </div>
            </div>
          </div>

          {/* Persetujuan */}
          <div className="section">
            <div className="section-title">
              <h2>✍️ Tanda Tangan / Persetujuan</h2>
            </div>
            <div className="grid">
              <div className="input-group">
                <label>Sales</label>
                <input name="sign_sales" value={form.sign_sales} onChange={handleChange} placeholder="Nama Sales" />
              </div>
              <div className="input-group">
                <label>Business Development</label>
                <input name="sign_business_development" value={form.sign_business_development} onChange={handleChange} placeholder="Nama BD" />
              </div>
              <div className="input-group">
                <label>Project Manager</label>
                <input name="sign_project_manager" value={form.sign_project_manager} onChange={handleChange} placeholder="Nama PM" />
              </div>
              <div className="input-group">
                <label>TL Divisi</label>
                <input name="sign_tl_divisi" value={form.sign_tl_divisi} onChange={handleChange} placeholder="Nama TL" />
              </div>
              <div className="input-group">
                <label>General Manager</label>
                <input name="sign_general_manager" value={form.sign_general_manager} onChange={handleChange} placeholder="Nama GM" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="section" style={{marginBottom: 0}}>
            <div className="action-buttons">
              <button type="button" className="btn btn-back" onClick={()=>window.history.back()}>← Kembali</button>
              <button type="button" className="btn btn-submit" onClick={handleSubmit}>💾 Simpan Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 16px'
  }
};