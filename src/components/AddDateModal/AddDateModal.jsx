import './AddDateModal.css'
import React, {useState} from 'react'
import {useFormState} from "../../hooks/useFormState"
import DateTimePicker from "react-datetime-picker"
import Button from '../Button/Button'
import {createDate} from '../../services/ApiClient'
import {useHistory} from 'react-router-dom'

export default function AddDateModal({user, onClick}) {

    const {state} = useFormState(
        {
            data: {
                userId: user.id,
                date: new Date()
            },
            error: {
                date: true,
            }
        },
        {
            date: (v) => v.length
        }
    )

    const {data, error} = state

    const [setRegisterError] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [date, setDate] = useState(new Date())
    const [closeModal, setCloseModal] = useState(false)
    const history = useHistory()


    const isError = Object.values(error).some((err) => err)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await createDate(data)
            setCloseModal(!closeModal)
            history.push('/mi-info')
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const setTime = (e) => {
        setDate(e)
        data.date = e
    }

    return (
        <>
            <div className={closeModal ? "modal AddDateModal close-modal" : "modal AddDateModal"}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-6 modal-body">
                            <span className="close" onClick={onClick}></span>
                            <h1>Agendar una cita para {user.name}</h1>
                            <form onSubmit={handleSubmit}>


                                <div className="form-group">
                                    <label className="label" htmlFor="date">
                                        Date
                  </label>
                                    <DateTimePicker
                                        onChange={setTime}
                                        value={data.date}
                                        locale="es-ES"
                                        format="dd-MM-y h:mm a"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="Button Button__enter"
                                    disabled={isError}
                                >
                                    Agendar cita
              </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
