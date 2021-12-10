import './ModalPrev.css'
import React, {useState} from 'react'
import {Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import Button from '../../../Button/Button'
import {deleteBlog} from '../../../../services/ApiClient'

function ModalPrev({data, hideModalPrev, updateData}) {

    const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, -10rem, 0);
    }
  
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }`

    const hideUp = keyframes`
    from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    }

    to {
    opacity: 0;
    transform: translate3d(0, -10rem, 0);
    }`

    const [animation, setAnimation] = useState(customAnimation)

    const deleteCase = async (data) => {
        const updatedCases = await deleteBlog(data.id)
        setAnimation(hideUp)
        setTimeout(() => {
            hideModalPrev()
        }, 700)
        updateData(updatedCases)
    }

    return (
        <div className="ModalPrev">
            <Reveal className="container ModalPrev__body" direction="up" duration={700} keyframes={animation}>
                <>
                    <span className="close" onClick={hideModalPrev}></span>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <h1>Borrar caso
                            </h1>
                            <span>{data.title}</span>
                        </div>
                        <div className="col-6 d-flex justify-content-around align-items-center">
                            <Button className="ModalPrev__delete" onClick={() => deleteCase(data)}>SI</Button>
                            <Button className="ModalPrev__cancel" onClick={hideModalPrev}>NO</Button>
                        </div>
                    </div>
                </>
            </Reveal>
        </div>
    )
}

export default ModalPrev
