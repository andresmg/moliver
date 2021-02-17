import './Modal.css'
import React, {useState} from 'react'
import {PDFDownloadLink} from '@react-pdf/renderer'
import PdfDoc from '../PdfDoc/PdfDoc'
import Button from '../Button/Button'
import {useHistory} from 'react-router-dom'
import {dropBiopsy} from '../../services/ApiClient'

export default function Modal({data, onClick, admin}) {

    const [isMessage, setIsMessage] = useState('')
    const [bool, setBool] = useState(false)

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    const history = useHistory()

    const deleteBiopsy = async (biopsyId) => {
        await dropBiopsy(biopsyId)
        setIsMessage(`La biopsia Nro ${data.number} ha sido eliminada exitosamente.`)
        setTimeout(() => {
            history.push('/my-info')
        }, 2000)
    }

    const showConfirm = () => {
        setBool(!bool)
        setIsMessage('')
    }

    const hideConfirmModal = () => {
        setBool(!bool)
    }

    return (
        <>
            <div className="modal">
                <div className="container">
                    <div className="row justify-content-center">
                        {bool && !isMessage &&
                            <div className="col-sm-6 col-11 modal-body">
                                <span className="close" onClick={hideConfirmModal}></span>
                                <div className="message">
                                    <div className="content text-center">
                                        <p>¿Eliminar la biopsia <strong>{data.number}</strong>?</p>
                                        <Button className="col-5 delete secondary" onClick={() => deleteBiopsy(data.id)}>Eliminar biopsia</Button>
                                    </div>
                                </div>
                            </div>
                        }

                        {isMessage &&
                            <div className="col-sm-6 col-11 modal-body">
                                <div className="message">
                                    <div className="content text-center">{isMessage}</div>
                                </div>
                            </div>
                        }
                        {!isMessage && bool === false &&
                            <div className="col-sm-6 col-11 modal-body">
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
                                        <div className="col-4 name">{data.user.name}</div>
                                        <div className="col-4 text-center"><strong>CI</strong> {data.user.dni}</div>
                                        <div className="col-4 text-right"><strong>Edad</strong> {new Date().getFullYear() - new Date(data.user.birthdate).getFullYear()}</div>
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
                                    <PDFDownloadLink className="primary downloadPDF" document={<PdfDoc data={data} />} fileName={`${data.number}.pdf`}>
                                        {({blob, url, loading, error}) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
                                    </PDFDownloadLink>
                                </div>


                                {admin &&
                                    <>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <Button className="col-5 edit primary">Editar biopsia</Button>
                                            <Button className="col-5 delete secondary" onClick={showConfirm}>Eliminar biopsia</Button>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
