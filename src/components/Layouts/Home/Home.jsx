import './Home.css'
import React, {useState, useEffect} from 'react'
import {getAllBlogs} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'
import {truncate} from '../../../helpers/globals'


export default function Home() {

    const [blogs, setBlogs] = useState([])
    const [blogLoaded, setBlogLoaded] = useState(6)

    const showMore = () => {
        setBlogLoaded(blogLoaded + 6)
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
            <section className="container head-bg Home__banner"></section>
            <section className="container Home">
                <div className="row">
                    <div className="col-12 mt-5">
                        <h1 className="Home__h1 title">Últimas <span>publicaciones</span></h1>
                    </div>
                </div>

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
            </section>
        </>
    )
}
