import './BlogSingle.css'
import React from 'react'

function BlogSingle(props) {
    const data = props.location.blogData

    return (
        <>
            <section className="container head-bg" style={{
                background: `url(${data.picPath}) no-repeat center center / cover`,
            }}></section>
            <section className="container Home">
                <div className="row">
                    <div className="col-12 mt-5 Home__h1">
                        <h1>{data.title}</h1>
                    </div>
                </div>

                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {data.content}
                </div>
            </section>
        </>
    )
}

export default BlogSingle
