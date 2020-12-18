import './InputFile.css'
import React from 'react'

export default function InputFile({onChange, name, type, className}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{name}</label>
            <input
                onChange={onChange}
                name={name}
                type={type}
                className={className}
            />
        </div>
    )
}

