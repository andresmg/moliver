import './Home.css'
import React, {useState, useEffect} from 'react'
import {getAllBlogs} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'


export default function Home() {

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    const [blogs, setBlogs] = useState([])

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
            <section className="container head-bg"></section>
            <section className="container Home">
                <div className="row">
                    <div className="col-12 mt-5 Home__h1">
                        <h1>Últimas publicaciones</h1>
                    </div>
                </div>

                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {blogs.map(el =>
                        <Link to={{
                            pathname: '/blog',
                            blogData: el
                        }} class="col">
                            <div class="card h-100">
                                <img src={el.picPath} class="card-img-top" alt={el.title} />
                                <div class="card-body">
                                    <h2 class="card-title">{el.title}</h2>
                                    <small><strong>autor</strong> {el.authorId.name}</small>
                                    <p class="card-text">{truncate(el.content, 200)}</p>
                                </div>
                                <div class="card-footer">
                                    <small class="text-muted">creado el {new Date(el.date).toLocaleDateString('es')}</small>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </section>
        </>
    )
}
