import './SelectWithLabel.css'
import React from 'react'

export default function SelectWithLabel({name, value, onChange, options}) {
    return (
        <div className="form-group">
            <label className="select-label" htmlFor={name}>{name}</label>
            <select className="custom-select custom-select-lg" name={name} value={value} onChange={onChange}>
                <option defaultValue>Select One...</option>
                {
                    options.map(el => <option>{el}</option>)
                }
            </select>
        </div>
    )
}