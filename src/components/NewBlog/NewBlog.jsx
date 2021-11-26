import './NewBlog.css'
import React, {useState} from 'react'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import Button from '../Form/FormButton/FormButton'
import {useHistory} from 'react-router-dom'
import {useFormState} from '../../hooks/useFormState'
import {createBlog} from '../../services/ApiClient'
import {Editor} from '@tinymce/tinymce-react'
import InputFile from '../Form/InputFile/InputFile'

function NewBlog({user}) {

    const [userData] = useState(user)

    const {state, onChange} = useFormState(
        {
            data: {
                id: user.id,
                title: "",
                content: "",
                picpath: ""
            },
            error: {},
            touch: {},
        },
        {
            title: v => v.length,
            content: v => v.length,
            picpath: v => v.length
        }
    )

    const history = useHistory()

    const {data, } = state

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await createBlog(data)
            history.push({
                pathname: '/blog',
                blogData: data
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleContentChange = (e) => {
        data.content = e.target.getContent()
    }

    return (
        <>
            <section className="container biopsy-bg">
                <div className="user-info">
                    <div className="user-profile"></div>
                    <div className="row user-info-row">
                        <div className="col-12 col-sm-10 name"><h1>{userData.name}</h1></div>
                        {user.role === 'Admin' ? <div className="col-12"><strong>Admin</strong></div> :
                            <>
                                <div className="col-6  dni"><strong>CI</strong> {userData.dni}</div>
                                <div className="col-4 age"><strong>Edad</strong> {new Date().getFullYear() - new Date(userData.birthdate).getFullYear()}</div>
                            </>
                        }
                    </div>
                </div>
            </section>
            <div className="container my-info new-biopsy">
                <div className="row justify-content-center">
                    <div className="col-11 login-block">
                        <h1>Nueva entrada de blog</h1>

                        <form onSubmit={handleSubmit}>

                            <InputWithLabel
                                value={data.title}
                                onChange={onChange}
                                name="title"
                                type="text"
                                label="Nombre"
                                className="form-control"
                                placeholder="Ingresa el nombre del paciente"

                            />

                            <InputFile
                                value={data.picpath}
                                onChange={onChange}
                                name="picpath"
                                type="file"
                                label="Imagen de portada"
                                className="form-control"
                                placeholder="Ingresa imagen de portada del paciente"
                            />

                            <label>Contenido del blog</label>
                            <Editor
                                apiKey="54r6mw2o9ngrlah90uhsoq3nelou082lxiq0tvwml3ryyfqw"
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image',
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount'
                                    ],
                                    toolbar:
                                        'bold italic | alignleft aligncenter alignright | bullist numlist'
                                }}
                                onChange={handleContentChange}
                            />

                            <Button
                                type="submit"
                                className="Button Button__enter"
                            >Agregar biopsia</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBlog