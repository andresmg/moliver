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
                    <div className="row justify-content-center">
                        <div className="col-11 modal-body">
                            <span className="close" onClick={onClick}></span>
                            <p className="PatientModal__patient">{patient.name} <strong>{patient.dni}</strong></p>
                            {patientHistories.map(el =>
                                <>
                                    <div className="patient-history">
                                        <p className="PatientModal__date"><small>Consulta del </small>{new Date(el.date).getDate()} / {new Date(el.date).getMonth()} / {new Date(el.date).getFullYear()}</p>
                                        <p className="PatientModal__reason"><small>Razón de la visita</small> {el.visit_reason}</p>
                                        <p className="PatientModal__history"><small>Historia clínica</small> {el.clinic_history}</p>
                                        <p className="PatientModal__diagnostic"><small>Diagnóstico</small> {el.diagnostics}</p>
                                        <p className="PatientModal__treatment"><small>Tratamiento</small> {el.treatment}</p>
                                    </div><hr></hr>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
