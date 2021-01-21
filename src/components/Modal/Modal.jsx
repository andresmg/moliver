import './Modal.css'
import React from 'react'
import Button from '../Button/Button'

export default function Modal({data, onClick}) {

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    const downloadPdf = () => {
        console.log('descargar PDF')
    }

    return (
        <div className="modal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-12 modal-body">
                        <span className="close" onClick={onClick}></span>
                        <h1>{data.name}</h1>
                        <p className="discipline">{data.discipline}</p>
                        <p><strong>Biopsia</strong> {data.details}</p>
                        <hr />
                        <p><span>Biopsia</span> {data.number}</p>
                        <p><span>Fecha</span> {new Date(data.date).getDate()} {months[new Date(data.date).getMonth()]} {new Date(data.date).getFullYear()} </p>
                        <p><span>Referencia</span> {data.reference}</p>
                        <p><span>Material remitido</span> {data.material}</p>
                        <p><span>Diagnóstico clínico</span> {data.clinic_diagnosis}</p>
                        <p><span>Informe</span></p>
                        <p>{data.report}</p>
                        <p><span>Diagnósticos</span></p>
                        <p>{data.diagnostics}</p>
                        <Button className="primary" onClick={downloadPdf}>Descargar PDF</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
