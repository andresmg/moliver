import './NewBiopsy.css'
import React, {useState} from 'react'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import Button from '../Form/FormButton/FormButton'
import {useHistory} from 'react-router-dom'
import {useFormState} from '../../hooks/useFormState'
import {addBiopsy} from '../../services/ApiClient'
import {Editor} from '@tinymce/tinymce-react'

export default function NewBiopsy({user}) {

    const [userData] = useState(user)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: "",
                dni: "",
                reference: "",
                material: "",
                clinic_diagnosis: ""
            },
            error: {
                name: true,
                dni: true,
                reference: true,
                material: true,
                clinic_diagnosis: true
            },
            touch: {},
        },
        {
            name: v => v.length,
            dni: v => v.length,
            reference: v => v.length,
            material: v => v.length,
            clinic_diagnosis: v => v.length
        }
    )

    const history = useHistory()

    const [registerError, setRegisterError] = useState(null)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await addBiopsy(data)
            history.push('/biopsias')
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleDiagnosticsChange = (e) => {
        data.diagnostics = e.target.getContent()
    }

    const handleReportChange = (e) => {
        data.report = e.target.getContent()
    }

    const isError = Object.values(error).some(err => err)

    return (
        <>
            <section className="container biopsy-bg">
                <div className="user-info">
                    <div className="user-profile"></div>
                    <div className="row user-info-row">
                        <div className="col-12 col-sm-10 name"><h1>{userData.name}</h1></div>
                        {user.role === 'Admin' ? <div className="col-12"><strong>Admin</strong></div> :
                            <>
                                <div className="col-6  dni"><strong>CI</strong> {userData.dni}</div>
                                <div className="col-4 age"><strong>Edad</strong> {new Date().getFullYear() - new Date(userData.birthdate).getFullYear()}</div>
                            </>
                        }
                    </div>
                </div>
            </section>
            <div className="container my-info new-biopsy">
                <div className="row justify-content-center">
                    <div className="col-11 login-block">
                        <h1 className="title">Nueva <span>biopsia</span></h1>

                        <form onSubmit={handleSubmit}>

                            <InputWithLabel
                                value={data.name}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="name"
                                type="text"
                                label="Nombre"
                                className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                placeholder="Ingresa el nombre del paciente"

                            />

                            <InputWithLabel
                                value={data.dni}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="dni"
                                type="text"
                                label="Cédula de identidad"
                                className={`form-control ${touch.dni && error.dni ? "is-invalid" : ""}`}
                                placeholder="Ingresa cédula de identidad del paciente"

                            />

                            <InputWithLabel
                                value={data.reference}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="reference"
                                type="text"
                                label="Referencia"
                                className={`form-control ${touch.reference && error.reference ? "is-invalid" : ""}`}
                                placeholder="Ingresa la referencia"

                            />


                            <InputWithLabel
                                value={data.material}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="material"
                                type="text"
                                label="Material remitido"
                                className={`form-control ${touch.material && error.material ? "is-invalid" : ""}`}
                                placeholder="Ingresa material remitido"

                            />

                            <InputWithLabel
                                value={data.clinic_diagnosis}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="clinic_diagnosis"
                                type="text"
                                label="Diagnóstico clínico"
                                className={`form-control ${touch.clinic_diagnosis && error.clinic_diagnosis ? "is-invalid" : ""}`}
                                placeholder="Ingresa diagnóstico clínico"

                            />

                            <label>Informe</label>
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
                                onChange={handleReportChange}
                            />


                            <label>Diagnósticos</label>
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
                                onChange={handleDiagnosticsChange}
                            />

                            {registerError && <div className="alert alert-danger">{registerError}</div>}

                            <Button
                                type="submit"
                                className="Button Button__enter"
                                disabled={isError}
                            >Agregar biopsia</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
