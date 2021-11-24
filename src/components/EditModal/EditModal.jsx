import './EditModal.css'
import React, {useState} from 'react'
import {useFormState} from '../../hooks/useFormState'
import {Editor} from '@tinymce/tinymce-react'
import {Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import {updateBiopsy} from '../../services/ApiClient'
import Button from '../Button/Button'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'


function EditModal({biopsy, hideEditModal, patchBiopsy}) {
    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                reference: biopsy.reference,
                material: biopsy.material,
                clinic_diagnosis: biopsy.clinic_diagnosis,
            },
            error: {
                reference: true,
                material: true,
                clinic_diagnosis: true
            },
            touch: {},
        },
        {
            reference: v => v.length,
            material: v => v.length,
            clinic_diagnosis: v => v.length
        }
    )

    const [registerError, setRegisterError] = useState(null)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const patchedBiopsy = await updateBiopsy(biopsy.id, data)
            patchBiopsy(patchedBiopsy)

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
        <div className="EditModal">

            <Reveal direction="up" duration={700} keyframes={customAnimation}>
                <>
                    <div className="container EditModal__body">
                        <span className="close" onClick={hideEditModal}></span>
                        <div className="row justify-content-center">
                            <div className="col-11">
                                <h1>Editar biopsia
                                    <span>{biopsy.number}</span>
                                </h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
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
                                        </div>
                                        <div className="col-12 col-sm-4">
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
                                        </div>
                                        <div className="col-12 col-sm-4">
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
                                        </div>
                                        <div className="col-12 col-sm-6"> <label>Informe</label>
                                            <Editor
                                                initialValue={biopsy.report}
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
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <label>Diagnósticos</label>
                                            <Editor
                                                initialValue={biopsy.diagnostics}
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
                                        </div>
                                    </div>

                                    {registerError && <div className="alert alert-danger">{registerError}</div>}

                                    <Button
                                        type="submit"
                                        className="Button Button__enter"
                                        disabled={isError}
                                    >Guardar cambios</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            </Reveal>
        </div>
    )
}

export default EditModal
