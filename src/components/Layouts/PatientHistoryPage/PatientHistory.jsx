import './PatientHistory.css'
import React, {useState, useEffect} from 'react'
import {getPatientHistories} from '../../../services/ApiClient'
import {drawTime} from '../../../helpers/globals'
import HistModal from './HistModal/HistModal'

function PatientHistory(props) {
    const patient = props.location.patientData

    const [patientHistories, setPatientHistories] = useState([])
    const [histModal, setHistModal] = useState(false)

    const getAllHistories = (data) => {
        setPatientHistories(data)
    }

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
            {histModal && <HistModal updatedHistories={(data) => getAllHistories(data)} patient={patient} onClick={() => setHistModal(!histModal)} />}
            <section className="container head-bg PatientHistory__bg">
                <div className="user-info">
                    <div className="user-profile"></div>
                    <div className="row user-info-row">
                        <div className="col-12 col-sm-10 name"><h1>{patient.name}</h1></div>
                        <div className="col-6 dni"><strong>CI</strong> {patient.dni}</div>
                        {patient.birthdate &&
                            <div className="col-4 age">
                                <strong>Edad</strong> {new Date().getFullYear() - new Date(patient.birthdate).getFullYear()}
                            </div>
                        }
                    </div>
                    <div className="PatientHistory__add-history" onClick={() => setHistModal(!histModal)}></div>
                </div>
            </section>
            <div className="PatientHistory">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-12 PatientHistory__body">
                            {patientHistories.map(el =>
                                <>
                                    <div className="PatientHistory__history">
                                        <p className="PatientHistory__date">Consulta del {drawTime(el.date)}</p>
                                        <small>Razón de la visita</small>
                                        <p className="PatientHistory__reason"> {el.visit_reason}</p>
                                        <small>Historia clínica</small>
                                        <p className="PatientHistory__clinic"> {el.clinic_history}</p>
                                        <small>Diagnóstico</small>
                                        <p className="PatientHistory__diagnostic" dangerouslySetInnerHTML={{__html: el?.diagnostics}}></p>
                                        <small>Tratamiento</small>
                                        <p className="PatientHistory__treatment" dangerouslySetInnerHTML={{__html: el?.treatment}}></p>
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

export default PatientHistory
