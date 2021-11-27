import './BlogSingle.css'
import React from 'react'

function BlogSingle(props) {
    const data = props.location.blogData

    return (
        <>
            <section className="container head-bg" style={{
                background: `url(${data.picPath}) no-repeat center center / cover`,
            }}></section>
            <section className="container BlogSingle">
                <div className="row">
                    <div className="col-12 mt-5">
                        <h1 className="BlogSingle__h1">{data.title}</h1>
                        <p className="BlogSingle__desc" dangerouslySetInnerHTML={{__html: data.content}}></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogSingle
