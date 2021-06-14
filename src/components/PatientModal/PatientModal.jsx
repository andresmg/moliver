import './PatientModal.css'
import React, {useState, useEffect} from 'react'
import {getPatientHistories} from '../../services/ApiClient'


export default function PatientModal({user, onClick}) {

    // eslint-disable-next-line no-unused-vars
    const [closeModal, setCloseModal] = useState(false)
    const [patientHistories, setPatientHistories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const allHistories = await getPatientHistories(user.id)
            console.log(allHistories)
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
                            <h1>{user.name}</h1>
                            <div>{user.dni}</div>
                            <h1>Historias</h1>
                            {patientHistories.map(el =>
                                <>
                                    <div className="patient-history">
                                        {el.date}
                                        {el.visit_reason}
                                        {el.clinic_history}
                                        {el.diagnostics}
                                        {el.treatment}
                                    </div><hr></hr>
                                </>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
