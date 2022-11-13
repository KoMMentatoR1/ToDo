import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomSnackbarError from "../components/CustomSnackbarError"
import CustomSnackbarSuccess from "../components/CustomSnackbarSuccess"
import PasswordInput from "../components/PasswordInput"
import { useAction } from "../hooks/useAction"
import useInput from "../hooks/useInput"
import { useTypeSelector } from "../hooks/useTypeSelector"
import "../less/login.less"
import "../less/switchPassword.less"
import { IInput } from "../types/types"

const SwitchPassword = () => {
    const email: IInput = useInput("", {empty: false})
    const code: IInput = useInput("", {empty: false})
    const newPassword: IInput = useInput("", {empty: false, minLength: 8})
    const navigator = useNavigate()
    const [canSend, setCanSend] = useState<boolean>(true)

    const {forgotPassword, newPass} = useAction()

    const [codeInput, setCodeInput] = useState<boolean>(false)

    const {error} = useTypeSelector(state => state.auth)

    const sendLogin = () => {
        forgotPassword(email.data)
        setCodeInput(true)
    }

    const sendNewPass = () => {
        newPass(email.data, code.data, newPassword.data)
        setCanSend(false)
        setCodeInput(true)
    }

  return (
    <div className="container">
        <div className="switchPassword">
            <div className='switchPasswordTitle'>Forgot Password</div>
            <form className='switchPasswordForm'>
            {
                !codeInput
                ?(                
                    <div className="inputContainer">
                        <div className='loginInput'>
                            <TextField
                            error={email.isDirty && !email.isValid}
                            sx={{width: "100%", mb: "25px"}}
                            onChange={email.onChange}
                            onBlur={email.onBlur}
                            label="Email"
                            variant="outlined"
                            value={email.data}
                            helperText={email.isDirty && email.errorMessage}
                            required
                        />
                        </div>
                        <Button sx={{ mt: "25px", fontSize: "15px", width: "100%"}} variant="outlined" onClick={() => sendLogin()}>Send code</Button>
                    </div>
                )
                :(
                    <div className="inputContainer">
                        <div className='loginInput'>
                            <TextField
                            error={code.isDirty && !code.isValid}
                            sx={{width: "100%"}}
                            onChange={code.onChange}
                            onBlur={code.onBlur}
                            label="Code"
                            variant="outlined"
                            value={code.data}
                            helperText={code.isDirty && code.errorMessage}
                            required
                            />
                        </div>
                        <div className='loginInput'>
                        <PasswordInput label='Пароль *' password={newPassword} />
                        </div>
                        <Button disabled={!canSend && !error || !newPassword.isValid} sx={{ mt: "25px", fontSize: "15px", width: "100%"}} variant="outlined" onClick={() => sendNewPass()}>Switch password</Button>
                    </div>
                )
            }
            <div className="buttonContainer">
                <Button onClick={() => {navigator("/login")}} sx={{mb: "25px", mt: "25px", fontSize: "15px", width: "100%"}} variant="outlined">Sing in</Button>
            </div>
        </form>
        <CustomSnackbarError />
        <CustomSnackbarSuccess text="Пароль изменен успешно" />
        </div>
    </div>
  )
}

export default SwitchPassword