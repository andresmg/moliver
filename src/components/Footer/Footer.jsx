import './Footer.css'
import React from 'react'

export default function Footer() {
    return (
        <footer className="Footer container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        Todos los derechos reservados {new Date().getFullYear()} © by Margarita Oliver
                    </div>
                    <div className="col-12 col-sm-6 Footer__link">
                        Diseño y programación por <a href="https://www.linkedin.com/in/andresmg/" target="_blank" rel="noopener noreferrer">Andrés Martínez</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
