import './Button.css'
import React from 'react'

export default function Button({className, onClick, children}) {
    return (
        <button className={className} onClick={onClick}>{children}</button>
    )
}
