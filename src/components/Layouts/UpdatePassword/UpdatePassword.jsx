import './UpdatePassword.css'
import React, {useState} from 'react'
import {updatePassword} from '../../../services/ApiClient'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import Button from '../../Form/FormButton/FormButton'
import {useHistory} from 'react-router-dom'
import {useFormState} from '../../../hooks/useFormState'

export default function UpdatePassword({user}) {



    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: user.id,
                password: "",
                newpassword: ""
            },
            error: {
                password: true,
                newpassword: true
            },
            touch: {},
        },
        {
            password: v => v.length,
            newpassword: v => v.length
        }
    )

    const history = useHistory()

    const [message, setMessage] = useState('')
    const [registerError, setRegisterError] = useState(null)

    const {data, error, touch} = state

    const updatePass = async (event) => {
        console.log(data)

        event.preventDefault()

        try {
            await updatePassword(data)
            document.querySelector('.message').classList.remove('d-none')
            document.querySelector('.alert').classList.add('d-none')
            setMessage('La contraseña ha sido actualizada')
            setTimeout(() => {
                document.querySelector('.message').classList.add('d-none')
                history.push('/biopsias')
            }, 3000)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const isError = Object.values(error).some(err => err)

    return (
        <>
            <section className="container head-bg"></section>
            <div className="container-fluid my-info">
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-xl-4 col-11 login-block">
                        <h1>Crea tu nueva contraseña</h1>
                        {!message &&
                            <>
                                <p className="mb-5">Hola {user.name}! necesitamos que te tomes unos minutos y actualices tu contraseña, recuerda que esta debe tener mínimo 6 caracteres y debe contener al menos un número y una letra mayúscula.</p>

                                <form onSubmit={updatePass}>

                                    <InputWithLabel
                                        value={data.password}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="password"
                                        type="password"
                                        label="Introduce tu contraseña actual"
                                        className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                        placeholder="Ingresa nueva contraseña"

                                    />

                                    <InputWithLabel
                                        value={data.newpassword}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="newpassword"
                                        type="password"
                                        label="Introduce tu nueva contraseña"
                                        className={`form-control ${touch.newpassword && error.newpassword ? "is-invalid" : ""}`}
                                        placeholder="Repite la contraseña"
                                    />

                                    <Button
                                        type="submit"
                                        className="Button Button__enter"
                                        disabled={isError}
                                    >Actualizar contraseña</Button>
                                </form>
                            </>
                        }
                        {registerError && <div className="alert alert-danger">{registerError}</div>}
                        <div className="message d-none text-center">{message ? message : ''}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
