import './Patients.css'
import React, {useState, useEffect} from 'react'
import {getAllPatients, createDate, deleteDate} from '../../services/ApiClient'
import Button from '../Button/Button'
import AddDateModal from '../AddDateModal/AddDateModal'

export default function Patients({user}) {

    const drawTime = (time) => {
        var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        var days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
        var d = new Date(time)
        var day = days[d.getDay()]
        var hr = d.getHours()
        var min = d.getMinutes()
        if (min < 10) {
            min = "0" + min
        }
        var ampm = "am"
        if (hr > 12) {
            hr -= 12
            ampm = "pm"
        }
        var date = d.getDate()
        var month = months[d.getMonth()]
        var year = d.getFullYear()
        return day + " " + date + " " + month + " " + year + ' - ' + hr + ":" + min + ampm + " "
    }

    const [userData] = useState(user)
    const [message, setMessage] = useState('')
    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const [bool, setBool] = useState(false)
    const [addUserDate, setAddUserDate] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredPatients = patients.filter(patient => {
        return (
            (patient.name.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1 || (patient.dni.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    const showModal = (data) => {
        setAddUserDate(data)
        setBool(!bool)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    const updateUserDate = async (data) => {
        await createDate(data)
        const allPatients = await getAllPatients()
        setPatients(allPatients)
        setBool(!bool)
    }

    const deleteUserDate = async (data) => {
        const dateId = data.id
        await deleteDate(dateId)
        const allPatients = await getAllPatients()
        setPatients(allPatients)
    }

    useEffect(() => {
        if (user.role === 'Admin') {
            const fetchData = async () => {
                const allPatients = await getAllPatients()
                setPatients(allPatients)
            }
            fetchData()
        } else {
            setMessage('No tiene los privilegios para visitar esta página.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {bool && <AddDateModal onClick={hideModal} user={addUserDate} onSetDate={updateUserDate} />}
            <section className="container head-bg">
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
            <section className="container">
                <div className="col-12">
                    {user.role === 'Admin' &&
                        <h1 className="title">Buscar <span>pacientes</span></h1>}
                </div>
            </section>

            <section className="container gray-bg">
                <div className="row">
                    <div className="col-12 form-group search-icon">
                        <input type="text" className="form-control" placeholder={user.role === 'Admin' && "Buscar por nombre o cédula del paciente"} onChange={handleChange} value={search} />
                    </div>
                </div>
            </section>
            <section className="container-fluid custom-card patients">
                <section className="container custom-info">
                    {message && <div className="message">{message}</div>}
                    <div className="row row-cols-1 row-cols-md-3 g-5">
                        {filteredPatients.length === 0 ?
                            <h1 className="col-12 loader">Sin <span>resultados</span></h1> : filteredPatients.map(el =>
                                <div className="col custom-block">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            {user.role === 'Admin' &&
                                                <>
                                                    <p className="card-text biopsia">{el.name} <span className="patient-dni"><strong>CI </strong>{el.dni}</span></p>
                                                    <p className="card-text biopsy-date"><strong>Edad</strong> {new Date().getFullYear() - new Date(el.birthdate).getFullYear()}  año(s)</p>
                                                </>
                                            }
                                            <p className="card-text email-icon mt-5"><span className="">Email</span><br /> {el.email}</p>
                                            <p className="card-text phone-icon mt-5"><span className="">Teléfono</span><br /> {el.phone}</p>
                                            <p className="card-text address-icon mt-5"><span className="">Dirección</span><br /> {el.address}, {el.city} - {el.zipcode}</p>
                                            {el.next_date.isDate === true && <p className="card-text calendar-icon mt-5"><span className="">Próxima cita</span><br />
                                                <div className="icons d-flex justify-content-between">{drawTime(el.next_date.date)}
                                                    <span className="d-flex justify-content-start">
                                                        <Button className="edit-icon" onClick={() => showModal(el)}></Button>
                                                        <Button className="delete-icon" onClick={() => deleteUserDate(el)}></Button>
                                                    </span>
                                                </div>
                                            </p>
                                            }
                                        </div>
                                        <div className="card-footer">
                                            {((new Date(el.next_date.date) < new Date()) || el.next_date.isDate === false) &&
                                                <p className="card-text purple-bg"><Button className="secondary plus-icon" onClick={() => showModal(el)}>Agendar cita</Button></p>
                                            }
                                            <Button className="primary plus-icon" onClick={() => console.log('algo')}>Ver historia de {el.name}</Button>
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
