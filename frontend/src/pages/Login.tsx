import React, {FC, useContext} from 'react'
import "../less/login.less"
import { TextField, Button } from '@mui/material'
import useInput from '../hooks/useInput'
import { IInput } from '../types/types'
import { useNavigate } from 'react-router-dom'
import { useAction } from '../hooks/useAction'

const Login: FC = () => {
  const navigator = useNavigate()

  const email: IInput = useInput("", {empty: false})
  const password: IInput = useInput("", {empty: false})

  const {login} = useAction()

  const auth = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    login(email.data, password.data)
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
            <div className='loginInput'>
              <TextField
                error={password.isDirty && !password.isValid}
                onChange={password.onChange}
                onBlur={password.onBlur}
                value={password.data}
                helperText={password.isDirty && password.errorMessage}
                sx={{width: "100%"}}
                label="Password"
                variant="outlined"
                required
              />
            </div>
          </div>
          <div className="buttonContainer">
            <Button disabled={!password.isValid || !email.isValid} sx={{mb: "15px", fontSize: "15px", width: "100%"}} variant="outlined" onClick={(e) => auth(e)}>log in</Button>
            <Button onClick={() => {navigator("/register")}} sx={{mb: "15px", fontSize: "15px", width: "100%"}} variant="outlined">Sing up</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login