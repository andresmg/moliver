import './AddDateModal.css'
import React, {useState} from 'react'
import {useFormState} from "../../hooks/useFormState"
import DateTimePicker from "react-datetime-picker"
import Button from '../Button/Button'


export default function AddDateModal({user, onClick, onSetDate}) {


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

    // eslint-disable-next-line no-unused-vars
    const [date, setDate] = useState(new Date())
    const [closeModal, setCloseModal] = useState(false)



    const isError = Object.values(error).some((err) => err)

    const handleSubmit = (event) => {
        event.preventDefault()
        setCloseModal(!closeModal)
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
                                    onClick={() => onSetDate(data)}
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
