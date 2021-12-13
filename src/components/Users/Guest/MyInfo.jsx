import './MyInfo.css'
import React, {useState, useEffect} from 'react'
import Button from '../../Button/Button'
import Modal from '../../Modal/Modal'
import {getAllbiopsies} from '../../../services/ApiClient'

export default function MyInfo({user}) {

    const [userData] = useState(user)
    const [admin, setAdmin] = useState(false)
    const [userBiopsies, setUserBiopsies] = useState(user.biopsies)
    const [search, setSearch] = useState('')
    const [bool, setBool] = useState(false)
    const [biopsyData, setBiopsyData] = useState('')

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredBiopsies = userBiopsies?.filter(biopsy => {
        return (
            (biopsy?.number.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1 || (biopsy?.reference.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1 || (biopsy?.user.name.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1 || (biopsy?.user.dni.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    const showModal = (data) => {
        setBool(!bool)
        setBiopsyData(data)
        if (user.role === 'Admin') {
            setAdmin(!admin)
        }
    }

    const onUpdate = async () => {
        hideModal()
        const allBiopsies = await getAllbiopsies()
        setUserBiopsies(allBiopsies)
    }

    const hideModal = async (biopsyWasUpdated) => {

        setBool(!bool)
        if (user.role === 'Admin') {
            setAdmin(!admin)
        }

        if (biopsyWasUpdated) {
            const allBiopsies = await getAllbiopsies()
            setUserBiopsies(allBiopsies)
        }
    }

    useEffect(() => {
        if (user.role === 'Admin') {
            const fetchData = async () => {
                const allBiopsies = await getAllbiopsies()
                setUserBiopsies(allBiopsies)
            }
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <Modal onUpdate={(updateData) => onUpdate(updateData)} onClick={(biopsyWasUpdated) => hideModal(biopsyWasUpdated)} biopsy={biopsyData} admin={admin} />}
            <section className="container head-bg">
                <div className="user-info">
                    <div className="user-profile"></div>
                    <div className="row user-info-row">
                        <div className="col-12 col-sm-10 name"><h1>{userData.name}</h1></div>
                        {user.role === 'Admin' ? <div className="col-12"><strong>Admin</strong></div> :
                            <>
                                <div className="col-6  dni"><strong>CI</strong> {userData.dni}</div>
                                {userData.birthdate &&
                                    <div className="col-4 age"><strong>Edad</strong> {new Date().getFullYear() - new Date(userData.birthdate).getFullYear()}</div>}
                            </>
                        }
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="col-12">
                    {user.role === 'Admin' ?
                        <h1 className="title">Buscar <span>biopsias</span></h1> :
                        <h1 className="title">Mis <span>biopsias</span></h1>}
                </div>
            </section>
            <section className="container gray-bg">
                <div className="row">
                    <div className="col-12 form-group search-icon">
                        <input type="text" className="form-control" placeholder={user.role === 'Admin' ? "Buscar por número de biopsia, referencia, cédula o nombre del paciente" : "Buscar por número de biopsia o referencia"} onChange={handleChange} value={search} />
                    </div>
                </div>
            </section>
            <section className="container-fluid custom-card">
                <section className="container custom-info">
                    <div className="row row-cols-1 row-cols-md-3 g-5">
                        {filteredBiopsies?.length === 0 ?
                            <h1 className="col-12 loader">Sin <span>resultados</span></h1> : filteredBiopsies?.map(el =>
                                <div className="col custom-block">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <p className="card-text biopsia">{el.number}</p>
                                            <p className={user.role === 'Admin' ? "card-text biopsy-date mb-3 mt-5" : "card-text biopsy-date mb-3"}><strong>{new Date(el.date).getDate()} {months[new Date(el.date).getMonth()]} {new Date(el.date).getFullYear()} </strong></p>
                                            {user.role === 'Admin' &&
                                                <>
                                                    <p className="patient-name">{el.user.name} <span className="patient-dni"><strong>CI </strong>{el.user.dni}</span></p>
                                                </>
                                            }
                                            <p className={user.role === 'Admin' ? "card-text doctor-icon mt-5" : "card-text doctor-icon"}><span className="">Referencia</span><br /> {el.reference}</p>
                                            <p className="card-text"><span className="scalpel-icon">Material remitido</span><br /> {el.material}</p>
                                            <p className="card-text"><span className="note-icon">Diagnóstico clínico</span><br /> {el.clinic_diagnosis}</p>
                                        </div>
                                        <div className="card-footer">
                                            <Button className="primary plus-icon" onClick={() => showModal(el)}>Ver resultados de la biopsia</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </section>
            </section>
        </>
    )
}
