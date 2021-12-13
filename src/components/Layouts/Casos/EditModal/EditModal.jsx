import './EditModal.css'
import React, {useState} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import {Editor} from '@tinymce/tinymce-react'
import {Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import {updateBlog} from '../../../../services/ApiClient'
import Button from '../../../Button/Button'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../../Form/InputFile/InputFile'
import {app} from '../../../../services/firebase'
import {useHistory} from 'react-router-dom'


function EditModal({blogcase, hideEditModal}) {
    const {state, onChange} = useFormState(
        {
            data: {
                title: blogcase.title,
                content: blogcase.content,
                picpath: blogcase.picpath,
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

    const {data} = state

    const [disabled, setDisabled] = useState(true)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await updateBlog(blogcase.id, data)
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


    const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, -10rem, 0);
    }
  
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }`

    const onFileSelected = async (e) => {
        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('images/' + file.name)

        // Upload file
        await filePath.put(file)
            .then(() => {
                console.log('Uploaded')
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.picPath = fileUrl
        console.log(fileUrl)

    }

    return (
        <Reveal className="container-fluid EditCaseModal" direction="up" duration={700} keyframes={customAnimation}>
            <div className="EditCaseModal__body container">
                <span className="close" onClick={hideEditModal}></span>
                <div className="row justify-content-center">
                    <div className="col-11">
                        <h1>Editar caso</h1>
                        <form onSubmit={handleSubmit}>

                            <InputWithLabel
                                value={data.title}
                                onChange={onChange}
                                name="title"
                                type="text"
                                label="Título"
                                className="form-control"
                                placeholder="Ingresa título de la noticia"

                            />

                            <InputFile
                                value={data.picpath}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                                label="Imagen de portada"
                                className="form-control"
                                placeholder="Ingresa imagen de portada del paciente"
                            />

                            <label>Contenido</label>
                            <Editor
                                initialValue={data.content}
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
                                        'image | bold italic | alignleft aligncenter alignright | bullist numlist'
                                }}
                                onChange={handleContentChange}
                            />

                            <Button
                                type="submit"
                                className="Button Button__enter"
                                disabled={disabled}
                            >Guardar cambios</Button>
                        </form>
                    </div>
                </div>
            </div>
        </Reveal>
    )
}

export default EditModal
