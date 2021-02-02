import './Register.css'
import React, {useState} from 'react'
import {register} from '../../../services/ApiClient'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import Button from '../../Form/FormButton/FormButton'
import {useHistory} from 'react-router-dom'
import {useFormState} from '../../../hooks/useFormState'



const Register = (props) => {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: "",
                email: "",
                dni: "",
                password: ""
            },
            error: {
                name: true,
                email: true,
                dni: true,
                password: true
            },
            touch: {},
        },
        {
            name: v => v.length,
            email: v => v.length,
            dni: v => v.length,
            password: v => v.length
        }
    )

    const history = useHistory()

    const [registerError, setRegisterError] = useState(null)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            console.log(data)
            await register(data)
            history.push('/login')
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const isError = Object.values(error).some(err => err)

    return (
        <>
            <div className={props.login ? 'container-fluid my-info' : 'container-fluid my-info login-bg'}>
                <div className="row center">
                    <div className="col-sm-6 col-xl-4 col-11 login-block">
                        <h1>Register</h1>

                        <form onSubmit={handleSubmit}>

                            <InputWithLabel
                                value={data.name}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="name"
                                type="text"
                                label="Nombre completo"
                                className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                placeholder="Ingresa tu nombre completo"

                            />


                            <InputWithLabel
                                value={data.email}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="email"
                                type="text"
                                label="Correo electrónico"
                                className={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                placeholder="Ingresa tu correo"

                            />

                            <InputWithLabel
                                value={data.dni}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="dni"
                                type="text"
                                label="Nombre completo"
                                className={`form-control ${touch.dni && error.dni ? "is-invalid" : ""}`}
                                placeholder="Ingresa tu cédula"

                            />

                            <InputWithLabel
                                value={data.password}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="password"
                                type="password"
                                label="Contraseña"
                                className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                placeholder="Ingresa tu contraseña"
                            />

                            {registerError && <div className="alert alert-danger">{registerError}</div>}

                            <Button
                                type="submit"
                                className="Button Button__enter"
                                disabled={isError}
                            >Register</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register