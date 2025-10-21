import React from 'react';

export default function BDDetail({ prospect, documents = [], team = [], milestones = [] }) {
	if (!prospect) return <div className="alert alert-warning">Data prospek tidak ditemukan.</div>;
	const steps = (prospect.start_actions || '').split(/\r?\n/).filter(s => s.trim() !== '');
	const maxTeamStep = Math.max(team.length, steps.length);
	return (
		<div className="container-fluid">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<div>
					<h1 className="h4 mb-0"><i className="bi bi-briefcase text-success me-2"></i> Detail Prospek</h1>
					<div className="text-muted small">Kode: <strong>{prospect.prospect_code}</strong></div>
				</div>
				<div className="btn-group">
					<button className="btn btn-outline-secondary btn-sm" onClick={() => window.history.back()}><i className="bi bi-arrow-left"></i></button>
					<button className="btn btn-outline-warning btn-sm"><i className="bi bi-pencil"></i> Edit</button>
					<button className="btn btn-outline-primary btn-sm"><i className="bi bi-printer"></i> Print</button>
					<button className="btn btn-outline-danger btn-sm"><i className="bi bi-file-earmark-pdf"></i> PDF</button>
					<button className="btn btn-outline-success btn-sm"><i className="bi bi-file-earmark-word"></i> Word</button>
				</div>
			</div>

			<div className="card shadow-sm mb-4">
				<div className="card-header py-2 bg-white"><strong className="small text-secondary text-uppercase">Ringkasan</strong></div>
				<div className="card-body small">
					<div className="row g-2">
						<div className="col-md-4"><strong>Nama Proyek:</strong><br />{prospect.nama_proyek}</div>
						<div className="col-md-4"><strong>Nama Client/Perusahaan:</strong><br />{prospect.nama_client}</div>
						<div className="col-md-4"><strong>Divisi Teknis:</strong><br />{prospect.divisi_teknis}</div>
						<div className="col-md-3"><strong>PIC Sales:</strong><br />{prospect.pic_sales}</div>
						<div className="col-md-3"><strong>PIC Client:</strong><br />{prospect.pic_client}</div>
						<div className="col-md-3"><strong>Durasi Pengerjaan:</strong><br />{prospect.durasi_pengerjaan}</div>
						<div className="col-md-3"><strong>Tanggal Update:</strong><br /><small>{prospect.updated_at || prospect.createdAt}</small></div>
					</div>
				</div>
			</div>

			<div className="card mb-4">
				<div className="card-header py-2 bg-white"><strong className="small text-secondary text-uppercase">Deskripsi & Kebutuhan</strong></div>
				<div className="card-body p-0">
					<table className="table table-bordered table-sm mb-0 small">
						<tbody>
							<tr className="table-section-header"><th colSpan={3} className="bg-primary text-white">Deskripsi Proyek/POC</th><th colSpan={2} className="bg-primary text-white">Kebutuhan Client</th></tr>
							<tr>
								<th className="bg-warning-subtle" style={{width:'18%'}}>Ringkasan Proyek / POC</th>
								<td colSpan={2} style={{width:'32%'}}><div style={{whiteSpace:'pre-wrap'}}>{prospect.ringkasan_proyek_poc}</div></td>
								<th className="bg-warning-subtle" style={{width:'18%'}}>Masalah utama client</th>
								<td style={{width:'32%'}}><div style={{whiteSpace:'pre-wrap'}}>{prospect.masalah_utama_client}</div></td>
							</tr>
							<tr>
								<th className="bg-warning-subtle">Teknologi yang digunakan<br/>(saat ini / sumber data)</th>
								<td colSpan={2}><div style={{whiteSpace:'pre-wrap'}}>{prospect.teknologi_client}</div></td>
								<th className="bg-warning-subtle">Solusi yang ditawarkan</th>
								<td><div style={{whiteSpace:'pre-wrap'}}>{prospect.solusi_ditawarkan}</div></td>
							</tr>
							<tr>
								<th className="bg-warning-subtle">Output atau Goals<br/>Proyek/POC</th>
								<td colSpan={2}><div style={{whiteSpace:'pre-wrap'}}>{prospect.output_goals}</div></td>
								<th className="bg-warning-subtle">Fitur / modul yang dibutuhkan</th>
								<td><div style={{whiteSpace:'pre-wrap'}}>{prospect.fitur_modul_dibutuhkan}</div></td>
							</tr>
							<tr>
								<th className="bg-warning-subtle">Catatan / Risiko</th>
								<td colSpan={4}><div style={{whiteSpace:'pre-wrap'}}>{prospect.catatan_risiko}</div></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div className="card mb-4">
				<div className="card-header py-2 bg-white"><strong className="small text-secondary text-uppercase">Dok Lampiran / Pendukung</strong></div>
				<div className="card-body p-0">
					<table className="table table-bordered table-sm mb-0 small">
						<thead className="table-light">
							<tr>
								<th style={{width:'50px'}}>No.</th>
								<th>Nama Dokumen</th>
								<th style={{width:'110px'}}>Status (Ok / Tidak)</th>
								<th style={{width:'220px'}}>Catatan / Temuan</th>
							</tr>
						</thead>
						<tbody>
							{documents.length === 0 ? (
								<tr><td colSpan={4} className="text-center text-muted">Belum ada dokumen.</td></tr>
							) : documents.map((d, i) => (
								<tr key={i}>
									<td>{i+1}</td>
									<td>{d.doc_name}</td>
									<td>{d.doc_status}</td>
									<td>{d.doc_notes}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="card mb-4">
				<div className="card-header py-2 bg-white"><strong className="small text-secondary text-uppercase">Tim yang Mengerjakan & Start Proyek/POC</strong></div>
				<div className="card-body p-0">
					<table className="table table-bordered table-sm mb-0 small">
						<thead>
							<tr>
								<th colSpan={2} className="bg-primary text-white" style={{width:'50%'}}>Tim yang Mengerjakan</th>
								<th className="bg-primary text-white" style={{width:'50%'}}>Start Proyek/POC</th>
							</tr>
							<tr className="table-light">
								<th style={{width:'50px'}}>No.</th>
								<th>Nama / Role</th>
								<th>Langkah</th>
							</tr>
						</thead>
						<tbody>
							{maxTeamStep === 0 ? (
								<tr><td colSpan={3} className="text-center text-muted">Belum ada tim / langkah.</td></tr>
							) : Array.from({length:maxTeamStep}).map((_,i) => {
								const tm = team[i] || {};
								const step = steps[i] ? `${i+1}. ${steps[i]}` : '';
								return (
									<tr key={i}>
										<td>{i+1}</td>
										<td>{tm.team_name}{tm.team_role ? <span className="text-muted"> ({tm.team_role})</span> : ''}</td>
										<td>{step}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			<div className="card mb-4">
				<div className="card-header py-2 bg-white"><strong className="small text-secondary text-uppercase">Milestone / Waktu Pengerjaan Proyek</strong></div>
				<div className="card-body p-0">
					<table className="table table-bordered table-sm mb-0 small">
						<thead className="table-light">
							<tr>
								<th style={{width:'50px'}}>No.</th>
								<th>Key Implementasi</th>
								<th style={{width:'130px'}}>Mulai</th>
								<th style={{width:'130px'}}>Selesai</th>
							</tr>
						</thead>
						<tbody>
							{milestones.length === 0 ? (
								<tr><td colSpan={4} className="text-center text-muted">Belum ada milestone.</td></tr>
							) : milestones.map((m,i) => (
								<tr key={i}>
									<td>{i+1}</td>
									<td>{m.ms_key}</td>
									<td>{m.ms_start}</td>
									<td>{m.ms_end}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="card mb-4">
				<div className="card-header py-2 bg-white"><strong className="small text-secondary text-uppercase">Tanda Tangan / Persetujuan</strong></div>
				<div className="card-body p-0">
					<table className="table table-bordered table-sm mb-0 small">
						<thead>
							<tr className="bg-primary text-white">
								<th>Sales</th>
								<th>Business Development</th>
								<th>Project Manager</th>
								<th>TL Divisi</th>
								<th>General Manager</th>
							</tr>
						</thead>
						<tbody>
							<tr style={{height:'100px'}}>
								<td className="align-bottom text-center">{prospect.sign_sales}</td>
								<td className="align-bottom text-center">{prospect.sign_business_development}</td>
								<td className="align-bottom text-center">{prospect.sign_project_manager}</td>
								<td className="align-bottom text-center">{prospect.sign_tl_divisi}</td>
								<td className="align-bottom text-center">{prospect.sign_general_manager}</td>
							</tr>
							<tr className="table-warning">
								<td className="text-center small">Nama</td>
								<td className="text-center small">Nama</td>
								<td className="text-center small">Nama</td>
								<td className="text-center small">Nama</td>
								<td className="text-center small">Nama</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
