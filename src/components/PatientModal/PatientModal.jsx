import './PatientModal.css'
import React, {useState, useEffect} from 'react'
import {getPatientHistories} from '../../services/ApiClient'


export default function PatientModal({patient, onClick}) {

    // eslint-disable-next-line no-unused-vars
    const [closeModal, setCloseModal] = useState(false)
    const [patientHistories, setPatientHistories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const allHistories = await getPatientHistories(patient.id)
            setPatientHistories(allHistories)
        }
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className={closeModal ? "modal PatientModal close-modal" : "modal PatientModal"}>
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-2 PatientModal__addHistory">Añadir historia</div>
                        <div className="col-12 modal-body">
                            <span className="close" onClick={onClick}></span>
                            <p className="PatientModal__patient">{patient.name} <strong>{patient.dni}</strong></p>
                            {patientHistories.map(el =>
                                <>
                                    <div className="PatientModal__history">
                                        <p className="PatientModal__date">Consulta del {new Date(el.date).getDate()} / {new Date(el.date).getMonth()} / {new Date(el.date).getFullYear()}</p>
                                        <small>Razón de la visita</small>
                                        <p className="PatientModal__reason"> {el.visit_reason}</p>
                                        <small>Historia clínica</small>
                                        <p className="PatientModal__clinic"> {el.clinic_history}</p>
                                        <small>Diagnóstico</small>
                                        <p className="PatientModal__diagnostic"> {el.diagnostics}</p>
                                        <small>Tratamiento</small>
                                        <p className="PatientModal__treatment"> {el.treatment}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
