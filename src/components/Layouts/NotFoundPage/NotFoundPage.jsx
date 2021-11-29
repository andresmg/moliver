import './NotFoundPage.css'
import React from 'react'
import {Link} from 'react-router-dom'

function NotFoundPage() {
    return (
        <>
            <section className="container head-bg Home__banner"></section>
            <section className="container NotFoundPage">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-5 login-block">
                        <h1 className="NotFoundPage__h1 m-0">ERROR 404</h1>
                        <p>Esta página no existe, por favor revisa la ruta que quieres visitar.</p>
                        <Link className="NotFoundPage__btn" to="/">Ir al inicio</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NotFoundPage
