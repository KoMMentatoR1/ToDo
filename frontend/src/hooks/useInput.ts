import React, { useEffect, useState } from "react"
import { IInput, IValidation } from "../types/types"

interface IParams {
    empty?: boolean,
    minLength?: number,
    email?: boolean 
}

const useValidation = (data: string, params: IParams): IValidation => {
    const [isEmpty, setEmpty] = useState<boolean>(true)
    const [minLength, setMinLength] = useState<boolean>(true)
    const [isEmail, setEmail] = useState<boolean>(true)
    const [isValid, setValid] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        for (let param in params){
            switch(param){
                case "empty": data ? setEmpty(false) : setEmpty(true); break;
                case "minLength": data.length < params[param]! ? setMinLength(false) : setMinLength(true); break;
                case "email":  
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    re.test(String(data).toLowerCase()) ? setEmail(true) : setEmail(false)
                    break;  
            }
        }
    },[data])

    useEffect(() => {
        if(isEmpty || !minLength || !isEmail){
            setValid(false)
        }
        else{
            setValid(true)
        }
    }, [isEmpty, minLength, isEmail])

    useEffect(() => {
        if(!params.empty && isEmpty){
            setErrorMessage("Поле не может быть пустым")
        }
        else if(params.minLength && !minLength){
            setErrorMessage("Длина не может быть меньше " + params.minLength)
        }
        else if(params.email && !isEmail){
            setErrorMessage("Неверный email")
        }
        else setErrorMessage("")
    }, [isEmpty, minLength, isEmail])

    return {
        isValid,
        errorMessage
    }
}

const useInput = (targetData: string, params: IParams): IInput => {
    const [data, setData] = useState<string>(targetData)
    const [isDirty, setDirty] = useState<boolean>(false)

    const valid: object = useValidation(data, params)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.value)
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setDirty(true)
    }

    return {
        data,
        isDirty,
        onChange,
        onBlur,
        ...valid
    }
}

export default useInput;