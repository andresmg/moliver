import './Login.css'
import React, {useState, useEffect} from 'react'
import {useAuthContext} from '../../../contexts/AuthContext'
import {login, activateUser, googleUserLogin} from '../../../services/ApiClient'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import Button from '../../Form/FormButton/FormButton'
import {Link, Redirect} from 'react-router-dom'
import {useFormState} from '../../../hooks/useFormState'
import {Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"


const Login = (props) => {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                email: "",
                password: ""
            },
            error: {
                email: true,
                password: true
            },
            touch: {},
        },
        {
            email: v => v.length,
            password: v => v.length
        }
    )

    const [activate, setActivate] = useState(false)

    useEffect(() => {
        if (props.confirmed) {
            const token = props.match.params.token
            activateUser(token)
                .then(() => setActivate(true))
        }
    }, [props.match.params.token, props.confirmed])

    const {user} = useAuthContext()

    const [loginError, setLoginError] = useState(null)

    const authContext = useAuthContext()

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const user = await login(data)
            authContext.login(user)
        } catch (err) {
            setLoginError(err.response?.data?.message)
        }
    }


    const googleLogin = async () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then((result) => {
                GoogleAuthProvider.credentialFromResult(result)
                const gooleUser = result.user
                googleUserLogin(gooleUser)
                    .then(user => authContext.login(user))
                    .catch(err => console.log(err))
            }).catch((error) => {
                console.log(GoogleAuthProvider.credentialFromError(error))
            })
    }

    const isError = Object.values(error).some(err => err)

    if (user && user.role === 'Guest') {
        return <Redirect to="/biopsias" />
    }
    if (user && user.role === 'Admin') {
        return <Redirect to="/biopsias" />
    }
    if (user && user.role === 'Temporary') {
        return <Redirect to="/update-password" />
    }

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
        <>
            <section className="login container head-bg"></section>
            <Reveal duration={700} keyframes={customAnimation}>
                <div className={props.login ? 'container-fluid my-info' : 'container-fluid my-info login-bg'}>
                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-xl-4 col-11 login-block">
                            <h1>Ingresa con tu cuenta</h1>

                            {activate && <div className="message">Tu usuario ha sido activado exitosamente, por favor ingresa con tu usuario y contraseña.</div>}

                            <form className="Login__form" onSubmit={handleSubmit}>

                                <InputWithLabel
                                    value={data.email}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="email"
                                    type="text"
                                    label="Correo electrónico"
                                    className={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                    placeholder="Enter email"

                                />

                                <InputWithLabel
                                    value={data.password}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="password"
                                    type="password"
                                    label="Contraseña"
                                    className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                    placeholder="Enter password"
                                />

                                {loginError && <div className="alert alert-danger">{loginError}</div>}


                                <Button
                                    type="submit"
                                    className="Button Button__enter"
                                    disabled={isError}
                                >Ingresa</Button>
                            </form>
                            <div className="col-12 Login__google" onClick={googleLogin}><img src="./images/google.svg" alt="Login con google" className="Login__img" />Ingresa con google</div>
                            <div className="col-12 d-flex justify-content-center Login__options">
                                <Link to="/register"><strong>Registrate aquí</strong></Link>
                                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </>
    )
}

export default Login