import './Header.css'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {useAuthContext} from '../../contexts/AuthContext'


const Header = () => {

    const {user} = useAuthContext()
    const {logout} = useAuthContext()

    return (
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <div className="header-user">
                        <div className="navbar-brand">
                            <NavLink to="/mi-info">
                                <h1 className="logo-header"><strong>Margarita</strong></h1>
                            </NavLink>
                        </div>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarToggle"
                        aria-controls="navbarToggle"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="bars"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
                            ></path>
                        </svg>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarToggle">
                        <ul className="navbar-nav col-12 col-sm-10 p-0">
                            {user && user.role === 'Guest' &&
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/citas">Mis citas</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/historias">Mis historias</NavLink>
                                    </li>
                                </>
                            }
                            {user && user.role === 'Admin' &&
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/pacientes">Mis pacientes</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/nueva-biopsia">Agregar biopsia</NavLink>
                                    </li>
                                </>
                            }
                            {user &&
                                <span className="user-logs">
                                    <li>
                                        <NavLink to="/" className="nav-link logout" onClick={logout}>Salir</NavLink>
                                    </li>
                                </span>}
                            {!user &&
                                <>
                                    <li className="nav-item">
                                        <NavLink activeClassName="active" className="nav-link" to="/">Inicio</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeClassName="active" className="nav-link" to="/blog">Blog</NavLink>
                                    </li>
                                    <span className="user-logs">
                                        <li className="nav-item">
                                            <NavLink className="nav-link login" to="/login">Ingresa</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/register">Regístrate</NavLink>
                                        </li>
                                    </span>
                                </>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Header