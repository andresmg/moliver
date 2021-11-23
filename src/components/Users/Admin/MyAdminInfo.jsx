import React, {useEffect} from 'react'
import {getSession} from '../../../services/ApiClient'

function MyAdminInfo({user}) {
    console.log(user.role)

    useEffect(() => {
        getSession(user.role)
            .then(u => {
                console.log('esta es la respuesta:')
                console.log(u)
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="container">
            <h1>SOY {user.role}</h1>
        </div>
    )

}

export default MyAdminInfo


