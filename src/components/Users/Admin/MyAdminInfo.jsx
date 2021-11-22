import React from 'react'

function MyAdminInfo({user}) {
    return (
        <div className="container">
            <h1>SOY {user.role}</h1>
        </div>
    )
}

export default MyAdminInfo


