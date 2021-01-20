import './MyInfo.css'
import React, {useState} from 'react'
import Button from '../../Button/Button'

export default function MyInfo({user}) {

    console.log(user)

    const [userData] = useState(user)
    const [search, setSearch] = useState('')

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredBiopsies = userData.biopsies.filter(biopsy => {
        return (
            (biopsy.number.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1 || (biopsy.reference.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    return (
        <>
            <section className="container-fluid user-info">
                <div className="container">
                    <div className="row user-info-row">
                        <div className="name-initials">
                            {userData.name.match(/\b(\w)/g).join('')}
                        </div>
                        <div className="col-12 col-sm-3 name">Hola, <h1>{userData.name}</h1></div>
                        <div className="col-6 col-sm-3 dni"><strong>CI</strong> {userData.dni}</div>
                        <div className="col-6 col-sm-3 age"><strong>Edad</strong> {new Date().getFullYear() - new Date(userData.birthdate).getFullYear()}</div>
                    </div>
                </div>
            </section>
            <div className="container-fluid margin-top gym-centers">
                <div className="row p-0">
                    <div className="col-12 gyms-bg"></div>
                </div>
                <div className="row">
                    <div className="col-12 form-group">
                        <input type="text" className="form-control" placeholder="Buscar por número de biopsia o referencia" onChange={handleChange} value={search} /></div>
                </div>
            </div>
            {filteredBiopsies.map(el =>
                <section className="container-fluid biopsy-card">
                    <section className="container biopsy-info">
                        <p><span>Biopsia</span> {el.number}</p>
                        <p><span>Fecha</span> {new Date(el.date).getDate()} {months[new Date(el.date).getMonth()]} {new Date(el.date).getFullYear()} </p>
                        <p><span>Referencia</span> {el.reference}</p>
                        <p><span>Material remitido</span> {el.material}</p>
                        <p><span>Diagnóstico clínico</span> {el.clinic_diagnosis}</p>
                        <p><span>Informe</span></p>
                        <p>{el.report}</p>
                        <p><span>Diagnósticos</span></p>
                        <p>{el.diagnostics}</p>
                        <Button className="primary">Ver detalle</Button>
                    </section>
                </section>
            )}
        </>
    )
}
