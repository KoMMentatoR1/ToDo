import React, {FC, useEffect} from 'react'
import "../less/login.less"
import { TextField, Button } from '@mui/material'
import useInput from '../hooks/useInput'
import { IInput } from '../types/types'
import { useNavigate } from 'react-router-dom'
import { useAction } from '../hooks/useAction'
import { useTypeSelector } from '../hooks/useTypeSelector'
import LoaderWithBackground from '../components/LoaderWithBackground'
import PasswordInput from '../components/PasswordInput'
import CustomSnackbarError from '../components/CustomSnackbarError'


const Login: FC = () => {
  const navigator = useNavigate()

  const email: IInput = useInput("", {empty: false})
  const password: IInput = useInput("", {empty: false})

  const { isLoading } = useTypeSelector(state => state.auth)
  const {login, clearErrorAuth} = useAction()

  useEffect(() => {
    clearErrorAuth()
  }, [])

  const auth = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    login(email.data, password.data)
  }

  if (isLoading){
    return <LoaderWithBackground />
  }

  return (
    <div className='container'>
      <div className='login'>
        <div className='loginTitle'>Let's Do</div>
        <form className='loginForm'>
          <div className="inputContainer">
            <div className='loginInput'>
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
            <PasswordInput label='Пароль *' password={password}/>
            <Button sx={{m: "auto"}} onClick={() => {navigator("/switchPassword")}} variant='text'>Forgot Password?</Button>
          </div>
          <div className="buttonContainer">
            <Button disabled={!password.isValid || !email.isValid} sx={{mb: "15px", fontSize: "15px", width: "100%"}} variant="outlined" onClick={(e) => auth(e)}>log in</Button>
            <Button onClick={() => {navigator("/register")}} sx={{mb: "15px", fontSize: "15px", width: "100%"}} variant="outlined">Sing up</Button>
          </div>
        </form>
      </div>
      <CustomSnackbarError />
    </div>
  )
}

export default Login