import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function IncidentForm() {
	const [companies, setCompanies] = useState([
		{ id: '1', name: 'PT Contoh Digital', code: 'PTCD' },
		{ id: '2', name: 'PT Teknologi Indonesia', code: 'PTTI' },
	]);
	const [selectedCompany, setSelectedCompany] = useState('');
	const [companyCode, setCompanyCode] = useState('');
	const [showCompanyModal, setShowCompanyModal] = useState(false);
	const [newCompanyName, setNewCompanyName] = useState('');
	const [newCompanyCode, setNewCompanyCode] = useState('');
	const [companyError, setCompanyError] = useState('');
	const [ticketId, setTicketId] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const [form, setForm] = useState({
		reported_at: '',
		sumber_laporan: '',
		reporter_name: '',
		status: 'Open',
		assigned_to: '',
		nama_aplikasi: '',
		sub_menu: '',
		priority: 'Medium',
		impact_level: '',
		urgency: '',
		problem: '',
		aplikasi_terdampak: '',
		lokasi_masalah: '',
		software: '',
		start_time: '',
		end_time: '',
	});

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');
		try {
			await new Promise(resolve => setTimeout(resolve, 500));
			setSuccess('Incident berhasil disimpan!');
			setForm({
				reported_at: '', sumber_laporan: '', reporter_name: '', status: 'Open', assigned_to: '',
				nama_aplikasi: '', sub_menu: '', priority: 'Medium', impact_level: '', urgency: '',
				problem: '', aplikasi_terdampak: '', lokasi_masalah: '', software: '', start_time: '', end_time: '',
			});
			setSelectedCompany('');
			setTicketId('');
			setTimeout(() => setSuccess(''), 3000);
		} catch (err) {
			setError('Gagal simpan incident!');
		}
		setLoading(false);
	};

	const handleAddCompany = async () => {
		setCompanyError('');
		if (!newCompanyName || !newCompanyCode) {
			setCompanyError('Nama dan kode wajib diisi');
			return;
		}
		if (companies.some(c => c.code === newCompanyCode)) {
			setCompanyError('Kode perusahaan sudah ada');
			return;
		}
		try {
			const newCompany = {
				id: String(Date.now()),
				name: newCompanyName,
				code: newCompanyCode,
			};
			setCompanies([...companies, newCompany]);
			setShowCompanyModal(false);
			setNewCompanyName('');
			setNewCompanyCode('');
		} catch (err) {
			setCompanyError('Gagal tambah perusahaan');
		}
	};

	return (
		<DashboardLayout
			userRole="admin"
			activeMenu="Incident Management"
			headerTitle="Form Incident Management"
			headerSubtitle="Silakan isi form berikut untuk melaporkan incident baru"
		>
			<>
				<style>{`
					body {
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
						background-color: #f5f5f5;
					}
					.container {
						max-width: 900px;
						margin: 0 auto;
						padding: 20px;
					}
					.header {
						margin-bottom: 30px;
					}
					.header h1 {
						margin: 0;
						font-size: 28px;
						color: #333;
						font-weight: 600;
					}
					.header p {
						margin: 5px 0 0 0;
						color: #666;
						font-size: 14px;
					}
					.alert {
						padding: 12px 16px;
						border-radius: 6px;
						margin-bottom: 16px;
						font-size: 14px;
					}
					.alert-success {
						background-color: #d4edda;
						color: #155724;
						border: 1px solid #c3e6cb;
					}
					.alert-danger {
						background-color: #f8d7da;
						color: #721c24;
						border: 1px solid #f5c6cb;
					}
					.card {
						background: white;
						border-radius: 8px;
						margin-bottom: 20px;
						border: 1px solid #e0e0e0;
					}
					.card-header {
						padding: 16px;
						border-bottom: 1px solid #e0e0e0;
						background-color: #fafafa;
						font-weight: 600;
						color: #333;
						font-size: 14px;
					}
					.card-body {
						padding: 20px;
					}
					.form-group {
						margin-bottom: 16px;
					}
					.form-label {
						display: block;
						margin-bottom: 6px;
						font-weight: 500;
						color: #333;
						font-size: 13px;
					}
					.required {
						color: #d32f2f;
					}
					.form-control, .form-select {
						width: 100%;
						padding: 8px 12px;
						border: 1px solid #d0d0d0;
						border-radius: 4px;
						font-size: 13px;
						font-family: inherit;
						box-sizing: border-box;
					}
					.form-control:focus, .form-select:focus {
						outline: none;
						border-color: #1976d2;
						box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
					}
					textarea.form-control {
						resize: vertical;
						min-height: 100px;
					}
					.form-control::placeholder {
						color: #999;
					}
					.row {
						display: flex;
						gap: 16px;
						flex-wrap: wrap;
					}
					.col-md-3 {
						flex: 1;
						min-width: 200px;
					}
					.col-md-4 {
						flex: 1;
						min-width: 240px;
					}
					.col-md-5 {
						flex: 1.2;
						min-width: 260px;
					}
					.col-md-6 {
						flex: 1.5;
						min-width: 280px;
					}
					.col-12 {
						flex: 1 0 100%;
					}
					@media (max-width: 768px) {
						.col-md-3, .col-md-4, .col-md-5, .col-md-6 {
							flex: 1 0 100%;
							min-width: auto;
						}
					}
					.button-group {
						display: flex;
						gap: 12px;
						margin-top: 24px;
					}
					.btn {
						padding: 10px 20px;
						border: none;
						border-radius: 4px;
						font-size: 14px;
						font-weight: 500;
						cursor: pointer;
						transition: all 0.2s;
					}
					.btn-primary {
						background-color: #1976d2;
						color: white;
					}
					.btn-primary:hover:not(:disabled) {
						background-color: #1565c0;
					}
					.btn-primary:disabled {
						background-color: #90caf9;
						cursor: not-allowed;
					}
					.btn-secondary {
						background-color: #e0e0e0;
						color: #333;
					}
					.btn-secondary:hover {
						background-color: #d0d0d0;
					}
					.btn-success {
						background-color: #4caf50;
						color: white;
					}
					.btn-success:hover {
						background-color: #388e3c;
					}
					.btn-light {
						background-color: #f5f5f5;
						color: #333;
						border: 1px solid #d0d0d0;
					}
					.btn-light:hover {
						background-color: #e0e0e0;
					}
					.btn-outline-success {
						background-color: white;
						color: #4caf50;
						border: 1px solid #4caf50;
						font-size: 12px;
						padding: 6px 12px;
					}
					.btn-outline-success:hover {
						background-color: #f1f8f4;
					}
					.modal-overlay {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background: rgba(0,0,0,0.5);
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 1000;
					}
					.modal {
						background: white;
						border-radius: 8px;
						width: 90%;
						max-width: 400px;
						box-shadow: 0 4px 16px rgba(0,0,0,0.15);
					}
					.modal-header {
						padding: 16px;
						border-bottom: 1px solid #e0e0e0;
						font-weight: 600;
						font-size: 16px;
						color: #333;
					}
					.modal-body {
						padding: 20px;
					}
					.modal-footer {
						padding: 16px;
						border-top: 1px solid #e0e0e0;
						background-color: #fafafa;
						display: flex;
						justify-content: flex-end;
						gap: 8px;
					}
					.btn-close {
						position: absolute;
						right: 16px;
						top: 16px;
						background: none;
						border: none;
						font-size: 20px;
						cursor: pointer;
						color: #999;
					}
					.btn-close:hover {
						color: #333;
					}
					.small-text {
						font-size: 12px;
						color: #666;
						margin-top: 4px;
					}
					.d-flex {
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
				`}</style>

				<div className="container">
					<div className="header">
						<h1>Form Incident Management</h1>
						<p>Silakan isi form berikut untuk melaporkan incident baru</p>
					</div>

					{success && <div className="alert alert-success">{success}</div>}
					{error && <div className="alert alert-danger">{error}</div>}

					<form onSubmit={handleSubmit}>
						{/* Informasi Tiket */}
						<div className="card">
							<div className="card-header">Informasi Tiket</div>
							<div className="card-body">
								<div className="row">
									<div className="col-md-5">
										<div className="form-group">
											<label className="form-label d-flex">
												<span>Perusahaan / Client <span className="required">*</span></span>
												<button 
													type="button" 
													className="btn btn-outline-success"
													onClick={() => setShowCompanyModal(true)}
												>
													+ Tambah
												</button>
											</label>
											<select 
												className="form-select" 
												value={selectedCompany} 
												onChange={e => setSelectedCompany(e.target.value)} 
												required
											>
												<option value="">-- Pilih Perusahaan --</option>
												{companies.map(c => (
													<option key={c.id} value={c.id}>{c.name} ({c.code})</option>
												))}
											</select>
											<div className="small-text">Pilih perusahaan untuk auto-generate Ticket ID</div>
										</div>
									</div>
									<div className="col-md-3">
										<div className="form-group">
											<label className="form-label">Ticket ID <span className="required">*</span></label>
											<input 
												type="text" 
												className="form-control" 
												value={ticketId} 
												readOnly 
												style={{backgroundColor: '#f9f9f9'}}
											/>
											<div className="small-text">Auto-generated</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label">Tanggal & Waktu Lapor <span className="required">*</span></label>
											<input 
												type="datetime-local" 
												className="form-control" 
												name="reported_at" 
												value={form.reported_at} 
												onChange={handleChange} 
												required 
											/>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label">Sumber Laporan</label>
											<input 
												type="text" 
												className="form-control" 
												name="sumber_laporan" 
												value={form.sumber_laporan} 
												onChange={handleChange} 
												placeholder="Email, Portal, Telepon, dsb." 
											/>
										</div>
									</div>
									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label">Pelapor</label>
											<input 
												type="text" 
												className="form-control" 
												name="reporter_name" 
												value={form.reporter_name} 
												onChange={handleChange} 
												placeholder="Nama pelapor" 
											/>
										</div>
									</div>
									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label">Status <span className="required">*</span></label>
											<select 
												className="form-select" 
												name="status" 
												value={form.status} 
												onChange={handleChange} 
												required
											>
												<option value="Open">Open</option>
												<option value="Closed">Closed</option>
											</select>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label className="form-label">Tim yang akan mengerjakan</label>
									<input 
										type="text" 
										className="form-control" 
										name="assigned_to" 
										value={form.assigned_to} 
										onChange={handleChange} 
										placeholder="Nama teknisi/tim" 
									/>
								</div>
							</div>
						</div>

						{/* Klasifikasi Masalah */}
						<div className="card">
							<div className="card-header">Klasifikasi Masalah</div>
							<div className="card-body">
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label className="form-label">Nama Aplikasi <span className="required">*</span></label>
											<input 
												type="text" 
												className="form-control" 
												name="nama_aplikasi" 
												value={form.nama_aplikasi} 
												onChange={handleChange} 
												required 
												placeholder="Contoh: Sistem ERP" 
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label className="form-label">Sub Menu</label>
											<input 
												type="text" 
												className="form-control" 
												name="sub_menu" 
												value={form.sub_menu} 
												onChange={handleChange} 
												placeholder="Contoh: Manajemen Inventory" 
											/>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label">Prioritas</label>
											<select 
												className="form-select" 
												name="priority" 
												value={form.priority} 
												onChange={handleChange}
											>
												<option value="Low">Low</option>
												<option value="Medium">Medium</option>
												<option value="High">High</option>
												<option value="Critical">Critical</option>
											</select>
										</div>
									</div>
									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label">Dampak</label>
											<input 
												type="text" 
												className="form-control" 
												name="impact_level" 
												value={form.impact_level} 
												onChange={handleChange} 
												placeholder="Contoh: High" 
											/>
										</div>
									</div>
									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label">Urgensi</label>
											<input 
												type="text" 
												className="form-control" 
												name="urgency" 
												value={form.urgency} 
												onChange={handleChange} 
												placeholder="Contoh: High" 
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Detail Masalah */}
						<div className="card">
							<div className="card-header">Detail Masalah</div>
							<div className="card-body">
								<div className="form-group">
									<label className="form-label">Deskripsi Masalah <span className="required">*</span></label>
									<textarea 
										className="form-control" 
										name="problem" 
										value={form.problem} 
										onChange={handleChange} 
										required 
										placeholder="Deskripsikan masalah secara detail..." 
									/>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label className="form-label">Aplikasi Terdampak</label>
											<input 
												type="text" 
												className="form-control" 
												name="aplikasi_terdampak" 
												value={form.aplikasi_terdampak} 
												onChange={handleChange} 
												placeholder="Contoh: Modul X" 
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label className="form-label">Lokasi Masalah</label>
											<input 
												type="text" 
												className="form-control" 
												name="lokasi_masalah" 
												value={form.lokasi_masalah} 
												onChange={handleChange} 
												placeholder="Server / Modul / Menu" 
											/>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label className="form-label">Software / Tools Terkait</label>
											<input 
												type="text" 
												className="form-control" 
												name="software" 
												value={form.software} 
												onChange={handleChange} 
												placeholder="DB, Browser, 3rd party, dll" 
											/>
										</div>
									</div>
									<div className="col-md-3">
										<div className="form-group">
											<label className="form-label">Start Time</label>
											<input 
												type="datetime-local" 
												className="form-control" 
												name="start_time" 
												value={form.start_time} 
												onChange={handleChange} 
											/>
										</div>
									</div>
									<div className="col-md-3">
										<div className="form-group">
											<label className="form-label">End Time</label>
											<input 
												type="datetime-local" 
												className="form-control" 
												name="end_time" 
												value={form.end_time} 
												onChange={handleChange} 
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Buttons */}
						<div className="button-group">
							<button 
								type="submit" 
								className="btn btn-primary" 
								disabled={loading}
							>
								{loading ? 'Menyimpan...' : 'Simpan'}
							</button>
							<button 
								type="button" 
								className="btn btn-secondary" 
								onClick={() => window.history.back()}
							>
								Batal
							</button>
						</div>
					</form>
				</div>

				{/* Modal Tambah Perusahaan */}
				{showCompanyModal && (
					<div className="modal-overlay">
						<div className="modal">
							<div style={{position: 'relative'}}>
								<div className="modal-header">Tambah Perusahaan</div>
								<button 
									className="btn-close" 
									onClick={() => setShowCompanyModal(false)}
								>
									×
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<label className="form-label">Nama Perusahaan <span className="required">*</span></label>
									<input 
										type="text" 
										className="form-control" 
										value={newCompanyName} 
										onChange={e => setNewCompanyName(e.target.value)} 
										placeholder="Contoh: PT Contoh Digital" 
									/>
								</div>
								<div className="form-group">
									<label className="form-label">Kode (Max 25, huruf/angka) <span className="required">*</span></label>
									<input 
										type="text" 
										className="form-control" 
										value={newCompanyCode} 
										onChange={e => setNewCompanyCode(e.target.value.toUpperCase())} 
										placeholder="Contoh: PTCD" 
										maxLength={25} 
									/>
									<div className="small-text">Gunakan singkatan unik</div>
								</div>
								{companyError && (
									<div className="alert alert-danger">{companyError}</div>
								)}
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									className="btn btn-light" 
									onClick={() => setShowCompanyModal(false)}
								>
									Batal
								</button>
								<button 
									type="button" 
									className="btn btn-success" 
									onClick={handleAddCompany}
								>
									Simpan
								</button>
							</div>
						</div>
					</div>
				)}
			</>
		</DashboardLayout>
	);
}