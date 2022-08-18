import React, { FC, useContext, useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import "../less/register.less"
import useInput from '../hooks/useInput'
import { IInput } from '../types/types'
import { useNavigate } from "react-router-dom"
import AuthService from '../services/AuthService'
import { useAction } from '../hooks/useAction'

const Register: FC = () => {
    const navigator = useNavigate()

    const email: IInput = useInput("", {empty: false, email: true})
    const password: IInput = useInput("", {empty: false, minLength: 8})
    const repeatPassword: IInput = useInput("", {empty: false, minLength: 8})
    const [passwordError, setPasswordError] = useState<boolean>(false)

    const {registration} = useAction()

    useEffect(() => {
        if(password.isDirty && repeatPassword.isDirty && (repeatPassword.data !== password.data)){

            setPasswordError(true)
        }
        else{
            setPasswordError(false)
        }
    }, [password.data, repeatPassword.data, password.isDirty, repeatPassword.isDirty])


    const auth = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        registration(email.data, password.data)
    }

    return (
        <div className='container'>
          <div className='register'>
            <div className='registerTitle'>Let's Do</div>
            <form className='registerForm'>
                <div className="inputContainer">
                    <div className='registerInput'>
                        <TextField
                            error={email.isDirty && !email.isValid}
                            sx={{width: "100%"}}
                            onChange={email.onChange}
                            onBlur={email.onBlur}
                            label="Email"
                            variant="outlined"
                            value={email.data}
                            helperText={email.isDirty && email.errorMessage}
                            required
                        />
                    </div>
                    <div className='registerInput'>
                        <TextField
                            error={password.isDirty && (!password.isValid || passwordError)}
                            onChange={password.onChange}
                            onBlur={password.onBlur}
                            value={password.data}
                            helperText={password.isDirty && password.errorMessage || passwordError && "пароли не совпадают"}
                            sx={{width: "100%"}}
                            label="Password"
                            variant="outlined"
                            required
                        />
                    </div>
                    <div className='registerInput'>
                        <TextField
                            error={repeatPassword.isDirty && (!repeatPassword.isValid || passwordError)} 
                            onChange={repeatPassword.onChange}
                            onBlur={repeatPassword.onBlur}
                            value={repeatPassword.data}
                            helperText={repeatPassword.isDirty && repeatPassword.errorMessage || passwordError && "пароли не совпадают"}
                            sx={{width: "100%"}}
                            label="Repeat password"
                            variant="outlined"
                            required 
                    />
                    </div>
                </div>
                <div className="buttonContainer">
                    <Button onClick={(e) => auth(e)} disabled={!password.isValid || !email.isValid || !repeatPassword.isValid || passwordError} sx={{mb: "15px", fontSize: "15px", width: "100%"}} variant="outlined">register</Button>
                    <Button onClick={() => navigator("/login") }  sx={{mb: "15px", fontSize: "15px", width: "100%"}} variant="outlined">Sing in</Button>
                </div>
            </form>
          </div>
        </div>
      )
}

export default Register