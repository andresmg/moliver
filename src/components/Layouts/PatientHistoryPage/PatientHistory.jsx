import './PatientHistory.css'
import React, {useState, useEffect} from 'react'
import {getPatientHistories} from '../../../services/ApiClient'

function PatientHistory(props) {
    const patient = props.location.patientData

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
        <div className="PatientHistory">
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-2 PatientHistory__addHistory">Añadir historia</div>
                    <div className="col-12 modal-body">
                        <p className="PatientHistory__patient">{patient.name} <strong>{patient.dni}</strong></p>
                        {patientHistories.map(el =>
                            <>
                                <div className="PatientHistory__history">
                                    <p className="PatientHistory__date">Consulta del {new Date(el.date).getDate()} / {new Date(el.date).getMonth()} / {new Date(el.date).getFullYear()}</p>
                                    <small>Razón de la visita</small>
                                    <p className="PatientHistory__reason"> {el.visit_reason}</p>
                                    <small>Historia clínica</small>
                                    <p className="PatientHistory__clinic"> {el.clinic_history}</p>
                                    <small>Diagnóstico</small>
                                    <p className="PatientHistory__diagnostic"> {el.diagnostics}</p>
                                    <small>Tratamiento</small>
                                    <p className="PatientHistory__treatment"> {el.treatment}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientHistory
