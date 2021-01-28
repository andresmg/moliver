import './Modal.css'
import React from 'react'
import {PDFDownloadLink} from '@react-pdf/renderer'
import PdfDoc from '../PdfDoc/PdfDoc'

export default function Modal({data, onClick}) {
    console.log(data)

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    return (
        <div className="modal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-12 modal-body">
                        <span className="close" onClick={onClick}></span>
                        <div className="row">
                            <div className="col-6">
                                <span className="icon">
                                    <h1>Biopsia</h1>
                                    <div className="b-number">{data.number}</div>
                                </span>
                            </div>
                            <div className="col-6 b-date text-right d-flex justify-content-end align-items-end">
                                {new Date(data.date).getDate()} {months[new Date(data.date).getMonth()]} {new Date(data.date).getFullYear()}
                            </div>
                        </div>
                        <div className="patient-info">
                            <div className="row">
                                <div className="col-4 name">{data.user[0].name}</div>
                                <div className="col-4 text-center"><strong>CI</strong> {data.user[0].dni}</div>
                                <div className="col-4 text-right"><strong>Edad</strong> {new Date().getFullYear() - new Date(data.user[0].birthdate).getFullYear()}</div>
                            </div>
                        </div>

                        <p><span>Referencia</span> {data.reference}</p>
                        <p><span>Material remitido</span> {data.material}</p>
                        <p><span>Diagnóstico clínico</span> {data.clinic_diagnosis}</p>
                        <p><span>Informe</span></p>
                        <p>{data.report}</p>
                        <p><span>Diagnósticos</span></p>
                        <p>{data.diagnostics}</p>
                        <div className="btn-row">
                            <PDFDownloadLink className="primary" document={<PdfDoc data={data} />} fileName={`${data.number}.pdf`}>
                                {({blob, url, loading, error}) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
