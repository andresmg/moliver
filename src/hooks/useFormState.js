import {useState} from 'react'

export const useFormState = (initialState, validations) => {

    const [state, setState] = useState(initialState)

    const onBlur = e => {
        const {name} = e.target
        setState(prev => {
            return {
                ...prev,
                touch: {
                    ...prev.touch,
                    [name]: true
                }
            }
        })
    }

    const onChange = e => {
        const {name, value, files} = e.target
        const valid = validations[name](value)

            setState(prev => {
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        [name]: files ? files[0] : value
                    },
                    error: {
                        ...prev.error,
                        [name]: !valid
                    }
                }
            })
    }

    return {state, onBlur, onChange}
}