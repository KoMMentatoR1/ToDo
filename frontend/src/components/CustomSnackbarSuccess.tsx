import React, {FC, useState, useEffect} from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { useAction } from '../hooks/useAction';

interface ICustomSnackbarSuccess {
    text: string;
}

const CustomSnackbarSuccess: FC<ICustomSnackbarSuccess> = ({text}) => {
    const [open, setOpen] = useState(false)

    const { user } = useTypeSelector(state => state.auth)
    const {switchSuccess} = useAction()

    useEffect(() => {
      user.user.id != -1 && setOpen(true)

      return () => {
        setOpen(false)
        switchSuccess(false)
      }
    }, [user.user.id])
    

    const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      setOpen(false)
      switchSuccess(false)
    }

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={alertHandleClose}>
      <Alert severity="success">
        {text}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbarSuccess