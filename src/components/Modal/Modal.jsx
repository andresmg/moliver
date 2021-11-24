import './Modal.css'
import React, {useState} from 'react'
import {PDFDownloadLink} from '@react-pdf/renderer'
import PdfDoc from '../PdfDoc/PdfDoc'
import Button from '../Button/Button'
import {dropBiopsy} from '../../services/ApiClient'
import parse from 'html-react-parser'
import EditModal from '../EditModal/EditModal'

export default function Modal({biopsy, onClick, admin, onUpdate}) {


    const [isMessage, setIsMessage] = useState('')
    const [bool, setBool] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [currentBiopsy, setCurrentBiopsy] = useState(biopsy)
    const [biopsyWasUpdated, setBiopsyWasUpdated] = useState(false)

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    const deleteBiopsy = async (biopsyId) => {
        await dropBiopsy(biopsyId)
        setIsMessage(`La biopsia Nro ${biopsy.number} ha sido eliminada exitosamente.`)
        setTimeout(() => {
            setIsMessage('')
            setBool(!bool)
            onUpdate()
        }, 2000)
    }

    const showConfirm = () => {
        setBool(!bool)
        setIsMessage('')
    }

    const hideConfirmModal = () => {
        setBool(!bool)
    }

   const patchBiopsy = (updatedBiopsy) => {
       setBiopsyWasUpdated(!biopsyWasUpdated)
       setEditModal(!editModal)
       setCurrentBiopsy(updatedBiopsy)
   }

    return (
        <>
            {editModal && <EditModal patchBiopsy={(updatedBiopsy) => patchBiopsy(updatedBiopsy)} biopsy={currentBiopsy} hideEditModal={() => setEditModal(!editModal)}/>}
            <div className="modal">
                <div className="container">
                    <div className="row justify-content-center">
                        {bool && !isMessage &&
                            <div className="col-sm-6 col-11 modal-body">
                                <span className="close" onClick={hideConfirmModal}></span>
                                <div className="message">
                                    <div className="content text-center">
                                        <p>¿Eliminar la biopsia <strong>{currentBiopsy.number}</strong>?</p>
                                        <Button className="col-5 delete secondary" onClick={() => deleteBiopsy(currentBiopsy.id)}>Eliminar biopsia</Button>
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
                                <span className="close" onClick={() => onClick(biopsyWasUpdated)}></span>
                                <div className="row">
                                    <div className="col-6">
                                        <span className="icon">
                                            <h1>Biopsia</h1>
                                            <div className="b-number">{currentBiopsy.number}</div>
                                        </span>
                                    </div>
                                    <div className="col-6 b-date text-right d-flex justify-content-end align-items-end">
                                        {new Date(currentBiopsy.date).getDate()} {months[new Date(currentBiopsy.date).getMonth()]} {new Date(currentBiopsy.date).getFullYear()}
                                    </div>
                                </div>
                                <div className="patient-info">
                                    <div className="row">
                                        <div className="col-4 name">{biopsy.user.name}</div>
                                        <div className="col-4 text-center"><strong>CI</strong> {biopsy.user.dni}</div>
                                        <div className="col-4 text-right"><strong>Edad</strong> {new Date().getFullYear() - new Date(biopsy.user.birthdate).getFullYear()}</div>
                                    </div>
                                </div>


                                <p><span>Referencia</span> {currentBiopsy.reference}</p>
                                <p><span>Material remitido</span> {currentBiopsy.material}</p>
                                <p><span>Diagnóstico clínico</span> {currentBiopsy.clinic_diagnosis}</p>
                                <p><span>Informe</span></p>
                                <p>{parse(currentBiopsy.report)}</p>
                                <p><span>Diagnósticos</span></p>
                                <p>{parse(currentBiopsy.diagnostics)}</p>

                                <div className="btn-row">
                                    <PDFDownloadLink className="primary downloadPDF" document={<PdfDoc data={currentBiopsy} />} fileName={`${currentBiopsy.number}.pdf`}>
                                        {({blob, url, loading, error}) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
                                    </PDFDownloadLink>
                                </div>
                                {admin &&
                                    <>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <Button className="col-5 edit primary" onClick={() => setEditModal(!editModal)}>Editar biopsia</Button>
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
