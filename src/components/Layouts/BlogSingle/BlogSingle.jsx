import './BlogSingle.css'
import React from 'react'
import {drawTime} from '../../../helpers/globals'

function BlogSingle(props) {
    const data = props.location.blogData

    return (
        <>
            <section className="container head-bg" style={{
                background: `url(${data?.picPath ? data?.picPath : './images/fondo-biopsy.jpg'}) no-repeat center center / cover`,
            }}></section>
            <div className="container my-info new-biopsy BlogSingle">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-8 login-block">
                        {data.date && <span className="BlogSingle__date">{drawTime(data?.date)}</span>}
                        <span className="BlogSingle__author">{data?.authorId?.name}</span>
                        <h1 className="BlogSingle__h1">{data?.title}</h1>
                        <p className="BlogSingle__desc" dangerouslySetInnerHTML={{__html: data?.content}}></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogSingle
