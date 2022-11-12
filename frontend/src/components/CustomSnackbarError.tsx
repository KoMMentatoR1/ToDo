import React, {FC, useState, useEffect} from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { useAction } from '../hooks/useAction'
const CustomSnackbarError: FC = () => {
    const [open, setOpen] = useState(false)

    const { error } = useTypeSelector(state => state.auth)

    const { clearErrorAuth } = useAction()

    useEffect(() => {
      error && setOpen(true)

      return () => {
        setOpen(false)
      }
    }, [error])
    

    const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      setOpen(false)
      clearErrorAuth()
    }

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={alertHandleClose}>
      <Alert severity="error">
        {error}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbarError