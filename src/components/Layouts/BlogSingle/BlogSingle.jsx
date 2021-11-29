import './BlogSingle.css'
import React from 'react'

function BlogSingle(props) {
    const data = props.location.blogData
    console.log(data)

    return (
        <>
            <section className="container head-bg" style={{
                background: `url(${data?.picPath}) no-repeat center center / cover`,
            }}></section>
            <div className="container my-info new-biopsy BlogSingle">
                <div className="row justify-content-center">
                    <div className="col-11 login-block">
                        <h1 className="BlogSingle__h1">{data?.title}</h1>
                        <p className="BlogSingle__desc" dangerouslySetInnerHTML={{__html: data?.content}}></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogSingle
