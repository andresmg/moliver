import './InputFile.css'
import React from 'react'

export default function InputFile({onChange, name, type, className, label}) {
    return (
        <div className="form-group">
            <label className="custom-file-label" htmlFor={name}>{label}</label>
            <input
                onChange={onChange}
                name={name}
                type={type}
                className="custom-file-input"
            />
        </div>
    )
}

