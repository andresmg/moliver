import './HistModal.css'
import React, {useState} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import {Editor} from '@tinymce/tinymce-react'
import Button from '../../../Button/Button'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import Reveal from 'react-awesome-reveal'
import {keyframes} from "@emotion/react"
import {addHistory} from '../../../../services/ApiClient'
import DateTimePicker from "react-datetime-picker"


function HistModal({patient, onClick}) {
    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                userId: patient.id,
                date: new Date(),
                visit_reason: "",
                clinic_history: "",
                diagnostic: "",
                treatment: "",
            },
            error: {
                visit_reason: true,
                clinic_history: true,
                diagnostic: true,
                treatment: true,
                date: true,
            },
            touch: {},
        },
        {
            date: v => v.length,
            visit_reason: v => v.length,
            clinic_history: v => v.length,
            diagnostic: v => v.length,
            treatment: v => v.length,
        }
    )

    const [registerError, setRegisterError] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [date, setDate] = useState(new Date())
    const {data, error} = state

    const setTime = (e) => {
        setDate(e)
        data.date = e
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            console.log(patient.id, data)
            // await addHistory(patient.id, data)

        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleTreatmentChange = (e) => {
        data.treatment = e.target.getContent()
    }

    const handleDiagnosticChange = (e) => {
        data.diagnostic = e.target.getContent()
    }

    const isError = Object.values(error).some(err => err)

    const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, -10rem, 0);
    }
  
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }`

    return (
        <div className="HistModal">
            <Reveal direction="up" duration={700} keyframes={customAnimation}>
                <>
                    <div className="container HistModal__body">
                        <span className="close" onClick={onClick}></span>
                        <div className="row justify-content-center">
                            <div className="col-11">
                                <h1>Agregar historia
                                    <span>{patient.name}</span>
                                </h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label" htmlFor="date">
                                                    Fecha de la visita
                                                </label>
                                                <DateTimePicker
                                                    onChange={setTime}
                                                    value={data.date}
                                                    locale="es-ES"
                                                    format="dd-MM-y"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <InputWithLabel
                                                value={data.visit_reason}
                                                onChange={onChange}
                                                name="visit_reason"
                                                type="text"
                                                label="Razón de la visita"
                                                className="form-control"
                                                placeholder="Ingresa la referencia"

                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <InputWithLabel
                                                value={data.clinic_history}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                name="clinic_history"
                                                type="text"
                                                label="Historia clínica"
                                                className="form-control"
                                                placeholder="Ingresa historia clínica"

                                            />
                                        </div>
                                        <div className="col-12 col-sm-6"> <label>Diagnóstico</label>
                                            <Editor
                                                apiKey="54r6mw2o9ngrlah90uhsoq3nelou082lxiq0tvwml3ryyfqw"
                                                init={{
                                                    height: 500,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist autolink lists link image',
                                                        'charmap print preview anchor help',
                                                        'searchreplace visualblocks code',
                                                        'insertdatetime media table paste wordcount'
                                                    ],
                                                    toolbar:
                                                        'bold italic | alignleft aligncenter alignright | bullist numlist'
                                                }}
                                                onChange={handleDiagnosticChange}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <label>Tratamiento</label>
                                            <Editor
                                                apiKey="54r6mw2o9ngrlah90uhsoq3nelou082lxiq0tvwml3ryyfqw"
                                                init={{
                                                    height: 500,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist autolink lists link image',
                                                        'charmap print preview anchor help',
                                                        'searchreplace visualblocks code',
                                                        'insertdatetime media table paste wordcount'
                                                    ],
                                                    toolbar:
                                                        'bold italic | alignleft aligncenter alignright | bullist numlist'
                                                }}
                                                onChange={handleTreatmentChange}
                                            />
                                        </div>
                                    </div>

                                    {registerError && <div className="alert alert-danger">{registerError}</div>}

                                    <Button
                                        type="submit"
                                        className="Button Button__enter"
                                        disabled={isError}
                                    >Añadir historia</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            </Reveal>
        </div>
    )
}

export default HistModal
