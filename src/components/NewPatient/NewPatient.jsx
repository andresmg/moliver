import './NewPatient.css'
import React, {useState} from 'react'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import Button from '../Form/FormButton/FormButton'
import {useHistory} from 'react-router-dom'
import {useFormState} from '../../hooks/useFormState'
import {addPatient} from '../../services/ApiClient'
import CheckBoxWithLabel from '../Form/CheckBoxWithLabel/CheckBoxWithLabel'

export default function NewPatient({user}) {

    const [userData] = useState(user)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: "",
                email: "",
                dni: "",
                address: "",
                zipcode: "",
                city: "",
                phone: "",
                birthdate: "",
                sex: "",
                insurance_carrier: "",
                marital_status: ""
            },
            error: {
                name: true,
                email: true,
                dni: true,
                address: true,
                zipcode: true,
                city: true,
                phone: true,
                birthdate: true,
                sex: true,
                insurance_carrier: true,
                marital_status: true
            },
            touch: {},
        },
        {
            name: v => v.length,
            email: v => v.length,
            dni: v => v.length,
            address: v => v.length,
            zipcode: v => v.length,
            city: v => v.length,
            phone: v => v.length,
            birthdate: v => v.length,
            sex: v => v.length,
            insurance_carrier: v => v.length,
            marital_status: v => v.length
        }
    )

    const history = useHistory()

    const [registerError, setRegisterError] = useState(null)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(data)
        try {
            await addPatient(data)
            history.push('/pacientes')
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
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
            <div className="container my-info new-patient">
                <div className="row justify-content-center">
                    <div className="col-11 login-block">
                        <h1>Nuevo paciente</h1>
                        <h3>Datos del paciente</h3>

                        <form onSubmit={handleSubmit}>

                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <InputWithLabel
                                        value={data.name}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="name"
                                        type="text"
                                        label="Nombre completo"
                                        className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                        placeholder="Ingresa el nombre del paciente"

                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <InputWithLabel
                                        value={data.email}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="email"
                                        type="text"
                                        label="Correo electrónico"
                                        className={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                        placeholder="Ingresa correo electrónico del paciente"

                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-12 col-sm-4">
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
                                </div>
                                <div className="col-12 col-sm-4">
                                    <InputWithLabel
                                        value={data.phone}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="phone"
                                        type="text"
                                        label="Teléfono"
                                        className={`form-control ${touch.phone && error.phone ? "is-invalid" : ""}`}
                                        placeholder="Ingresa teléfono de contacto"

                                    />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <InputWithLabel
                                        value={data.birthdate}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="birthdate"
                                        type="text"
                                        label="Fecha de nacimiento (dd/mm/aaaa)"
                                        className={`form-control ${touch.birthdate && error.birthdate ? "is-invalid" : ""}`}
                                        placeholder="Ingresa fecha de nacimiento"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <CheckBoxWithLabel data={['Hombre', 'Mujer']} name="sex"
                                        value={data.sex}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        label="Sexo"
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <CheckBoxWithLabel data={['Soltero/a', 'Casado/a']} name="marital_status"
                                        value={data.marital_status}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        label="Estado civil"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <h3 className="mt-5">Dirección del paciente</h3>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <InputWithLabel
                                        value={data.address}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="address"
                                        type="text"
                                        label="Dirección"
                                        className={`form-control ${touch.address && error.address ? "is-invalid" : ""}`}
                                        placeholder="Ingresa la dirección"

                                    />
                                </div>
                                <div className="col-12 col-sm-4">

                                    <InputWithLabel
                                        value={data.zipcode}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="zipcode"
                                        type="text"
                                        label="Código postal"
                                        className={`form-control ${touch.zipcode && error.zipcode ? "is-invalid" : ""}`}
                                        placeholder="Ingresa código postal"

                                    />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <InputWithLabel
                                        value={data.city}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="city"
                                        type="text"
                                        label="Ciudad"
                                        className={`form-control ${touch.city && error.city ? "is-invalid" : ""}`}
                                        placeholder="Ingresa ciudad"

                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <h3 className="mt-5">Seguro del paciente</h3>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <InputWithLabel
                                        value={data.insurance_carrier}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="insurance_carrier"
                                        type="text"
                                        label="Seguro médico"
                                        className={`form-control ${touch.insurance_carrier && error.insurance_carrier ? "is-invalid" : ""}`}
                                        placeholder="Ingresa compañía de seguro"

                                    />
                                </div>
                            </div>



                            {registerError && <div className="alert alert-danger">{registerError}</div>}

                            <Button
                                type="submit"
                                className="Button Button__enter"
                                disabled={isError}
                            >Agregar paciente</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
