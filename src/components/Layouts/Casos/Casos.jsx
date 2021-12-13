import './Casos.css'
import React, {useState, useEffect} from 'react'
import {getAllBlogs} from '../../../services/ApiClient'
import {truncate} from '../../../helpers/globals'
import {Reveal} from 'react-awesome-reveal'
import {keyframes} from "@emotion/react"
import Button from '../../Button/Button'
import ModalPrev from './ModalPrev/ModalPrev'
import EditModal from './EditModal/EditModal'


export default function Casos({user}) {

    const [blogs, setBlogs] = useState([])
    const [showModalPrev, setShowModalPrev] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [caseData, setCaseData] = useState()

    const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, 10rem, 0);
    }
  
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }`

    const deleteBlog = (blogcase) => {
        setShowModalPrev(!showModalPrev)
        setCaseData(blogcase)
    }

    const showModal = (blogcase) => {
        setShowEditModal(!showEditModal)
        setCaseData(blogcase)
    }

    const updateData = (blogcase) => {
        setBlogs(blogcase)
    }

    useEffect(() => {
        const fetchData = async () => {
            const allBlogs = await getAllBlogs()
            setBlogs(allBlogs)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {showModalPrev && <ModalPrev data={caseData} hideModalPrev={() => setShowModalPrev(!showModalPrev)} updateData={(updatedCases) => updateData(updatedCases)} />}
            {showEditModal && <EditModal blogcase={caseData} hideEditModal={() => setShowEditModal(!showEditModal)} />}
            <section className="container head-bg Home__banner"></section>
            <Reveal duration={700} keyframes={customAnimation} triggerOnce>
                <section className="container">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <h1 className="Home__h1 title">Últimos <span>casos</span></h1>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {blogs.map(el =>
                                    <div className="col Home__link">
                                        <div className="card Casos__card h-100">
                                            <div className="Home__img">
                                                <h2 className="card-title">{el.title}</h2>
                                                <img src={el.picPath ? el.picPath : './images/fondo-biopsy.jpg'} className="card-img-top" alt={el.title} />
                                            </div>
                                            <div className="card-body">
                                                <small className="text-muted">{new Date(el.date).toLocaleDateString('es')}</small>
                                                <small>{el.authorId.name}</small>
                                                <p className="Home__desc" dangerouslySetInnerHTML={{__html: truncate(el.content, 200)}}></p>
                                                <p className="Home__falselink">+ ver más</p>
                                            </div>
                                            {user.role === 'Admin' && <div className="Casos__footer">
                                                <Button className="Casos__edit" onClick={() => showModal(el)}>Editar caso</Button>
                                                <Button className="Casos__delete" onClick={() => deleteBlog(el)}>Borrar caso</Button>
                                            </div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Reveal>
        </>
    )
}
