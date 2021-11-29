import './Header.css'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {useAuthContext} from '../../contexts/AuthContext'


const Header = () => {

    const {user} = useAuthContext()
    const {logout} = useAuthContext()

    return (
        <div className="container Header">
            <nav className="Header__navbar row">
                <div className="header-user col-4">
                    <div className="navbar-brand">
                        <NavLink to="/biopsias">
                            <h1 className="logo-header"><strong>Margarita</strong></h1>
                        </NavLink>
                    </div>
                </div>
                <div className="Header__nav col-8">
                    <ul className="navbar-nav d-none d-sm-block">
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
                                    <NavLink className="nav-link" to="/biopsias">Biopsias</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/pacientes">Pacientes</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/nueva-biopsia">Agregar biopsia</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/nuevo-paciente">Agregar paciente</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/nuevo-blog">Agregar blog</NavLink>
                                </li>
                            </>
                        }
                        {user &&
                                <li className="nav-item">
                                    <NavLink to="/"  activeClassName="active" className="nav-link logout" onClick={logout}>Salir</NavLink>
                                </li>
                        }
                        {!user &&
                            <>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/">Casos</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link login" to="/login">Ingresa</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Regístrate</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                    {!user &&
                        <NavLink to="/login" className="d-block d-sm-none resp_login"></NavLink>
                    }
                </div>
            </nav>
        </div>
    )
}
export default Header