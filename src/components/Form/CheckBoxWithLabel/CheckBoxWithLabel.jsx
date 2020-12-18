import './CheckBoxWithLabel.css'
import React from 'react'

const CheckBoxWithLabel = ({data, name, onChange}) => {

    return (
        <div className="CheckBoxWithLabel row">
            {
                data?.sort().map(el =>
                    <div className="form-check col-6">
                        <input className="form-check-input" type="checkbox" name={name} id={el} value={el} onChange={onChange} />
                        <label className="form-check-label" htmlFor={el}>
                            {el}</label>
                    </div>
                )
            }
        </div>
    )
}

export default CheckBoxWithLabel
