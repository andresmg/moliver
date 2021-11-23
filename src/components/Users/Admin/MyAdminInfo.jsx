import React from 'react'
// import {getSession} from '../../../services/ApiClient'

function MyAdminInfo({user}) {


    // useEffect(() => {
    //     getSession()
    //         .then(user => {
    //             console.log(user)
    //         })
    // }, [])


    return (
        <div className="container">
            <h1>SOY {user.role}</h1>
        </div>
    )

}

export default MyAdminInfo


