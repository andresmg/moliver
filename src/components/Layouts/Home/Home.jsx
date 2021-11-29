import './Home.css'
import React, {useState, useEffect} from 'react'
import {getAllBlogs} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'
import {truncate} from '../../../helpers/globals'
import {Reveal} from 'react-awesome-reveal'
import {keyframes} from "@emotion/react"


export default function Home() {

    const [blogs, setBlogs] = useState([])
    const [blogLoaded, setBlogLoaded] = useState(6)

    const showMore = () => {
        setBlogLoaded(blogLoaded + 6)
    }

    const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, 10rem, 0);
    }
  
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }`

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
            <section className="container head-bg Home__banner"></section>
            <Reveal duration={700} keyframes={customAnimation} triggerOnce>
                <section className="container Home">
                    <div className="row justify-content-center">
                        <div className="col-11 login-block">
                            <h1 className="Home__h1 title">Últimos <span>casos</span></h1>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {blogs.slice(0, blogLoaded).map(el =>
                                    <Link to={{
                                        pathname: '/blog',
                                        blogData: el
                                    }} className="col Home__link">
                                        <div className="card Home__card h-100">
                                            <div className="Home__img">
                                                <h2 className="card-title">{el.title}</h2>
                                                <img src={el.picPath ? el.picPath : './images/fondo-biopsy.jpg'} className="card-img-top" alt={el.title} />
                                            </div>
                                            <div className="card-body">
                                                <small className="text-muted">{new Date(el.date).toLocaleDateString('es')}</small>
                                                <small>{el.authorId.name}</small>
                                                <p className="Home__desc" dangerouslySetInnerHTML={{__html: truncate(el.content, 200)}}></p>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="Home__loadmore" onClick={showMore}>Cargar más casos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Reveal>
        </>
    )
}
