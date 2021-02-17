import './InputWithLabel.css'
import React from 'react'

export default function InputWithLabel({value, name, onChange, onBlur, type, className, placeholder, label}) {



    return (
        <div className="form-group">
            <label className="label" htmlFor={name}>{label}</label>

            <input
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                className={className}
                name={name}
                type={type}
                placeholder={placeholder}
            />

            <div className="invalid-feedback">campo obligatorio</div>
        </div>
    )
}