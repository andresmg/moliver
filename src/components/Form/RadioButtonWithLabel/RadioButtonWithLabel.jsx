import './RadioButtonWithLabel.css'
import React from 'react'

export default function RadioButtonWithLabel({data, name, onChange, label}) {
    return (
        <div className="RadioButtonWithLabel">
            <p>{label}</p>
            {
                data?.sort().map(el =>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={name} id={el} value={el} onChange={onChange} />
                        <label className="form-check-label" htmlFor={el}>{el}</label>
                    </div>
                )
            }
        </div>
    )
}
