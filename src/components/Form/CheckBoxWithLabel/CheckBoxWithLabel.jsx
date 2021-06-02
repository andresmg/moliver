import './CheckBoxWithLabel.css'
import React from 'react'

const CheckBoxWithLabel = ({data, name, onChange, label}) => {

    return (
        <div className="CheckBoxWithLabel">
            <p>{label}</p>
            <div className="CheckBoxWithLabel row">
                {
                    data?.sort().map(el =>
                        <div className="form-check d-flex col-12 col-sm-3">
                            <input className="form-check-input" type="checkbox" name={name} id={el} value={el} onChange={onChange} />
                            <label className="form-check-label" htmlFor={el}>
                                {el}</label>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CheckBoxWithLabel
