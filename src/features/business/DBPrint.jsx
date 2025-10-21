import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import fanLogo from '../../assets/fan-logo.png';

export default function DBPrint({ prospect, documents = [], team = [], milestones = [] }) {
    const pdfRef = useRef();

    const handlePrintPDF = async () => {
        window.scrollTo(0, 0);
        const input = pdfRef.current;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const sections = Array.from(input.children);
        for (let i = 0; i < sections.length; i++) {
            const sectionCanvas = await html2canvas(sections[i], { scale: 2 });
            const imgData = sectionCanvas.toDataURL('image/png');
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        }
        pdf.save(`Prospek_${prospect.prospect_code || 'detail'}.pdf`);
    };

    if (!prospect) return <div className="alert alert-warning">Data prospek tidak ditemukan.</div>;

    const steps = (prospect.start_actions || '').split(/\r?\n/).filter(s => s.trim() !== '');
    const maxTeamStep = Math.max(team.length, steps.length);

    return (
        <div style={{ padding: '20px', background: '#f5f5f5' }}>
            <style>{`
                @media print {
                    body { background: white; margin: 0; padding: 0; }
                    .print-btn { display: none; }
                    .print-container { background: white; }
                }
                
                * {
                    box-sizing: border-box;
                }

                .print-container {
                    background: white;
                    font-family: Arial, sans-serif;
                    font-size: 10px;
                    padding: 0;
                    margin: 0 auto;
                    width: 100%;
                    max-width: 900px;
                    min-width: 700px;
                    box-sizing: border-box;
                }

                .container-body {
                    padding: 10mm 12mm;
                }

                .header-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 24px;
                    margin-bottom: 15px;
                    border-bottom: 3px solid #0070c0;
                }

                .header-section img {
                    height: 60px;
                    margin-right: 24px;
                }

                .company-name {
                    font-weight: bold;
                    font-size: 22px;
                    color: #000;
                    margin-bottom: 4px;
                    letter-spacing: 1px;
                }

                .company-sub {
                    font-size: 13px;
                    color: #222;
                    line-height: 1.2;
                    margin-bottom: 2px;
                }

                .header-title {
                    text-align: center;
                    padding: 8px;
                    background: #0070c0;
                    color: white;
                    font-weight: bold;
                    font-size: 11px;
                    margin-bottom: 12px;
                    border: 2px solid #0070c0;
                    letter-spacing: 0.5px;
                }

                .info-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 12px;
                    border: 2px solid #0070c0;
                }

                .info-table td {
                    padding: 6px 8px;
                    border: 1px solid #0070c0;
                    font-size: 10px;
                }

                .info-label {
                    font-weight: bold;
                    background: #ffe699;
                    color: #222;
                    width: 18%;
                    border: 1px solid #0070c0;
                }

                .info-value {
                    background: #eaf1fb;
                    width: 31%;
                    border: 1px solid #0070c0;
                }

                .info-value-3col {
                    background: #eaf1fb;
                    width: 13%;
                    border: 1px solid #0070c0;
                }

                .section-header {
                    background: #0070c0;
                    color: white;
                    padding: 6px 8px;
                    font-weight: bold;
                    font-size: 10px;
                    margin: 12px 0 0 0;
                    border: 2px solid #0070c0;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .table-section {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 12px;
                    border: 2px solid #0070c0;
                }

                .table-section thead {
                    background: #0070c0;
                    color: white;
                }

                .table-section th {
                    border: 1px solid #0070c0;
                    padding: 6px 4px;
                    font-weight: bold;
                    font-size: 10px;
                    text-align: center;
                    background: #ffe699;
                    color: #222;
                }

                .table-section td {
                    border: 1px solid #0070c0;
                    padding: 6px 4px;
                    font-size: 10px;
                    background: #fff;
                }

                .table-section tbody tr:nth-child(even) {
                    background: #f9f9f9;
                }

                .table-desc tbody tr th {
                    background: #0070c0;
                    color: white;
                    text-align: left;
                    font-weight: bold;
                    border: 1px solid #0070c0;
                    padding: 6px 4px;
                    font-size: 10px;
                }

                .table-desc tbody tr td {
                    border: 1px solid #0070c0;
                    padding: 6px 4px;
                    font-size: 10px;
                    background: #fff;
                }

                .table-yellow th {
                    background: #ffe699 !important;
                    color: #222 !important;
                    font-weight: bold;
                }

                .table-yellow tbody tr th {
                    background: #ffe699 !important;
                    color: #222 !important;
                }

                .table-yellow tbody tr:nth-child(even) {
                    background: #fffef0;
                }

                .signature-table {
                    width: 100%;
                    border-collapse: collapse;
                    border: 2px solid #0070c0;
                }

                .signature-table th {
                    background: #ffe699;
                    color: #222;
                    border: 2px solid #0070c0;
                    padding: 8px 6px;
                    font-weight: bold;
                    font-size: 10px;
                    text-align: center;
                }

                .signature-table td {
                    font-size: 10px;
                    padding: 8px 6px;
                    height: 70px;
                    vertical-align: bottom;
                    border: 2px solid #0070c0;
                }

                .signature-label {
                    background: #ffe699;
                    padding: 2px 0;
                    text-align: center;
                    font-weight: bold;
                    font-size: 11px;
                    border-top: 2px solid #0070c0;
                    border-bottom: 2px solid #0070c0;
                    border-left: 2px solid #0070c0;
                    border-right: 2px solid #0070c0;
                    color: #222;
                    letter-spacing: 0.5px;
                }

                .text-center {
                    text-align: center;
                }

                .text-muted {
                    color: #999;
                }

                .pre-wrap {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-size: 10px;
                }

                .no-column {
                    width: 40px;
                    text-align: center;
                }

                .colspan-header {
                    text-align: center;
                    background: #0070c0;
                    color: white;
                }

                @media print {
                    body { margin: 0; padding: 0; }
                    .print-container { margin: 0; padding: 0; width: 100%; height: auto; }
                }
            `}</style>

            <div style={{ marginBottom: '15px', textAlign: 'right' }}>
                <button className="print-btn btn btn-primary btn-sm" onClick={handlePrintPDF}>
                    <i className="bi bi-printer"></i> Print PDF
                </button>
            </div>

            <div ref={pdfRef} className="print-container">
                <div className="container-body">
                    {/* Header */}
                    <div className="header-section" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'24px',marginBottom:'15px',borderBottom:'3px solid #0070c0'}}>
                        <img src={fanLogo} alt="Logo" style={{height:'60px',marginRight:'24px'}} />
                        <div style={{textAlign:'center'}}>
                            <div className="company-name" style={{fontWeight:'bold',fontSize:'22px',color:'#000',marginBottom:'4px',letterSpacing:'1px'}}>PT. FAN INTEGRASI TEKNOLOGI</div>
                            <div className="company-sub" style={{fontSize:'13px',color:'#222',lineHeight:'1.2',marginBottom:'2px'}}>IT Consultant & Services</div>
                            <div className="company-sub" style={{fontSize:'11px',color:'#222',lineHeight:'1.2',marginBottom:'2px'}}>RukoPerumahan Taman Kota H7, Jl. KimangunSarkoro, Bekasi Jaya, Bekasi Timur, 17112</div>
                        </div>
                    </div>

                    <div className="header-title">Dokumen Persiapan Prospek untuk Kebutuhan Proyek</div>

                    {/* Informasi Prospek */}
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td className="info-label">Nama Proyek</td>
                                <td className="info-value" colSpan="2">{prospect.nama_proyek || '-'}</td>
                                <td className="info-label">Catalog</td>
                                <td className="info-value">{prospect.divisi_teknis || '-'}</td>
                            </tr>
                            <tr>
                                <td className="info-label">Nama Client/Perusahaan</td>
                                <td className="info-value" colSpan="2">{prospect.nama_client || '-'}</td>
                                <td className="info-label">Durasi</td>
                                <td className="info-value">{prospect.durasi_pengerjaan || '-'}</td>
                            </tr>
                            <tr>
                                <td className="info-label">PIC Sales</td>
                                <td className="info-value-3col">{prospect.pic_sales || '-'}</td>
                                <td style={{background: 'white', width: '18%', fontWeight: 'bold'}}>Daftar Persetujuan</td>
                                <td className="info-label">Sysdmin</td>
                                <td className="info-value">{prospect.pic_client || '-'}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Deskripsi & Kebutuhan */}
                    <div className="section-header">Deskripsi Proyek / POC</div>
                    <table className="table-section table-desc">
                        <tbody>
                            <tr>
                                <th style={{width: '20%'}}>Ringkasan Proyek / POC</th>
                                <td colSpan="2" style={{width: '30%'}}><div className="pre-wrap">{prospect.ringkasan_proyek_poc || '-'}</div></td>
                                <th style={{width: '20%'}}>Masalah utama client</th>
                                <td style={{width: '30%'}}><div className="pre-wrap">{prospect.masalah_utama_client || '-'}</div></td>
                            </tr>
                            <tr>
                                <th>Teknologi yang digunakan (saat ini / sumber data)</th>
                                <td colSpan="2"><div className="pre-wrap">{prospect.teknologi_client || '-'}</div></td>
                                <th>Solusi yang ditawarkan</th>
                                <td><div className="pre-wrap">{prospect.solusi_ditawarkan || '-'}</div></td>
                            </tr>
                            <tr>
                                <th>Output atau Goals Proyek/POC</th>
                                <td colSpan="2"><div className="pre-wrap">{prospect.output_goals || '-'}</div></td>
                                <th>Fitur / modul yang dibutuhkan</th>
                                <td><div className="pre-wrap">{prospect.fitur_modul_dibutuhkan || '-'}</div></td>
                            </tr>
                            <tr>
                                <th>Catatan / Risiko</th>
                                <td colSpan="4"><div className="pre-wrap">{prospect.catatan_risiko || '-'}</div></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Dokumen Lampiran */}
                    <div className="section-header">Dok Lampiran / Pendukung</div>
                    <table className="table-section table-yellow">
                        <thead>
                            <tr>
                                <th className="no-column">No.</th>
                                <th>Nama Dokumen</th>
                                <th style={{width: '110px'}}>Status (Ok / Tidak)</th>
                                <th>Catatan / Temuan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.length === 0 ? (
                                <tr><td colSpan="4" className="text-center text-muted">Belum ada dokumen.</td></tr>
                            ) : documents.map((d, i) => (
                                <tr key={i}>
                                    <td className="no-column">{i+1}</td>
                                    <td>{d.doc_name || '-'}</td>
                                    <td className="text-center">{d.doc_status || '-'}</td>
                                    <td>{d.doc_notes || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Tim & Start Proyek */}
                    <div className="section-header">Tim yang Mengerjakan & Start Proyek/POC</div>
                    <table className="table-section">
                        <thead>
                            <tr>
                                <th colSpan="2" className="colspan-header" style={{width: '50%'}}>Tim yang Mengerjakan</th>
                                <th className="colspan-header" style={{width: '50%'}}>Start Proyek/POC</th>
                            </tr>
                            <tr>
                                <th className="no-column">No.</th>
                                <th>Nama / Role</th>
                                <th>Langkah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maxTeamStep === 0 ? (
                                <tr><td colSpan="3" className="text-center text-muted">Belum ada tim / langkah.</td></tr>
                            ) : Array.from({length:maxTeamStep}).map((_,i) => {
                                const tm = team[i] || {};
                                const step = steps[i] ? `${i+1}. ${steps[i]}` : '';
                                return (
                                    <tr key={i}>
                                        <td className="no-column">{i+1}</td>
                                        <td>{tm.team_name || '-'}{tm.team_role ? ` (${tm.team_role})` : ''}</td>
                                        <td>{step || '-'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Milestone */}
                    <div className="section-header">Milestone / Waktu Pengerjaan Proyek</div>
                    <table className="table-section table-yellow">
                        <thead>
                            <tr>
                                <th className="no-column">No.</th>
                                <th>Key Implementasi</th>
                                <th style={{width: '120px', textAlign: 'center'}}>Mulai</th>
                                <th style={{width: '120px', textAlign: 'center'}}>Selesai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {milestones.length === 0 ? (
                                <tr><td colSpan="4" className="text-center text-muted">Belum ada milestone.</td></tr>
                            ) : milestones.map((m,i) => (
                                <tr key={i}>
                                    <td className="no-column">{i+1}</td>
                                    <td>{m.ms_key || '-'}</td>
                                    <td className="text-center">{m.ms_start || '-'}</td>
                                    <td className="text-center">{m.ms_end || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Tanda Tangan */}
                    <div className="section-header">Tanda Tangan / Persetujuan</div>
                    <table className="signature-table">
                        <thead>
                            <tr>
                                <th>Sales</th>
                                <th>Business Development</th>
                                <th>Project Manager</th>
                                <th>TL Divisi</th>
                                <th>General Manager</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="signature-label">{prospect.sign_sales || 'Nama'}</td>
                                <td className="signature-label">{prospect.sign_business_development || 'Nama'}</td>
                                <td className="signature-label">{prospect.sign_project_manager || 'Nama'}</td>
                                <td className="signature-label">{prospect.sign_tl_divisi || 'Nama'}</td>
                                <td className="signature-label">{prospect.sign_general_manager || 'Nama'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}