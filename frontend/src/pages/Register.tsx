import React, { FC, useEffect, useState } from 'react'
import { TextField, Button, Alert } from '@mui/material'
import "../less/register.less"
import useInput from '../hooks/useInput'
import { IInput } from '../types/types'
import { useNavigate } from "react-router-dom"
import { useAction } from '../hooks/useAction'
import { useTypeSelector } from '../hooks/useTypeSelector'
import LoaderWithBackground from '../components/LoaderWithBackground'
import PasswordInput from '../components/PasswordInput'
import CustomSnackbarError from '../components/CustomSnackbarError'
import CustomSnackbarSuccess from '../components/CustomSnackbarSuccess'

const Register: FC = () => {
    const navigator = useNavigate()

    const {isLoading, success} = useTypeSelector(state => state.auth)

    const email: IInput = useInput("", {empty: false, email: true})
    const password: IInput = useInput("", {empty: false, minLength: 8})
    const repeatPassword: IInput = useInput("", {empty: false, minLength: 8})
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const disabledButton = !password.isValid || !email.isValid || !repeatPassword.isValid || passwordError
    const {registration, clearErrorAuth} = useAction()

    useEffect(() => {
        clearErrorAuth()
    }, [])

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

    if(isLoading) {
        return <LoaderWithBackground />
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
                    <PasswordInput label='Пароль *' password={password} errors={[{state: passwordError, message: "Пароли не совпадают"}]}/>
                    <PasswordInput label='Повторите пароль *' password={repeatPassword} errors={[{state: passwordError, message: "Пароли не совпадают"}]}/>
                </div>
                <div className="buttonContainer">
                    <Button onClick={(e) => auth(e)} disabled={disabledButton} sx={{mb: "15px", fontSize: "15px", width: "100%"}} variant="outlined">register</Button>
                    <Button onClick={() => navigator("/login") }  sx={{mb: "15px", fontSize: "15px", width: "100%"}} variant="outlined">Sing in</Button>
                </div>
            </form>
          </div>
          <CustomSnackbarError />
          {
            success && <CustomSnackbarSuccess text='Пользователь зарегистрирован. Для входа нужно подтвердить аккаунт по ссылке на почте'/>
          }
        </div>
      )
}

export default Register