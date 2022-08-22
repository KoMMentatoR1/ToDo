import React, { useState, FC } from 'react'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { IInput } from '../types/types';
import "../less/login.less"

interface IError{
    state: boolean;
    message: string;
}

interface PasswordInputComponent {
    label: string;
    password: IInput;
    errors?: IError[]; 
}

const PasswordInput: FC<PasswordInputComponent> = ({label, password, errors}) => {

    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

    const hasError = (): IError => {
        if (errors){
            for (let i of errors){
                if(i.state === true){
                    return i
                }
            }
            return {state: false, message: ""}
        }
        else {
            return {state: false, message: ""}
        }   
    }

    const error = hasError()

  return (
    <FormControl error={password.isDirty && (!password.isValid || error.state)} sx={{ marginTop: "30px", width: '100%' }} variant="outlined">
        <InputLabel htmlFor="password">{label}</InputLabel>
        <OutlinedInput
            id="password"
            type={visiblePassword ? 'text' : 'password'}
            value={password.data}
            onChange={password.onChange}
            onBlur={password.onBlur}
            endAdornment={
            <InputAdornment position="end">
            <IconButton
                aria-label="password"
                onClick={() => setVisiblePassword(!visiblePassword)}
                edge="end"
            >
                {visiblePassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            </InputAdornment>
        }
        label={label}
        />
        {
            password.isDirty && (!password.isValid || error.state)
            ?(
                <FormHelperText>{password.errorMessage || error.message}</FormHelperText>  
            )
            :(
                ""
            )
        }
    </FormControl>
  )
}

export default PasswordInput