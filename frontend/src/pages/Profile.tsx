import {Button } from "@mui/material"
import CustomSnackbarError from "../components/CustomSnackbarError"
import CustomSnackbarSuccess from "../components/CustomSnackbarSuccess"
import MenuList from "../components/MenuList"
import PasswordInput from "../components/PasswordInput"
import PersonMenu from "../components/PersonMenu"
import { useAction } from "../hooks/useAction"
import useInput from "../hooks/useInput"
import { useTypeSelector } from "../hooks/useTypeSelector"
import "../less/lists.less"
import "../less/profile.less"

const Profile = () => {
    const password = useInput("", {empty: false})
    const newPassword = useInput("", {empty: false, minLength: 8})

    const {switchPassword} = useAction()
    const {user, error, success} = useTypeSelector(state => state.auth)

    const switchClick = () => {
        switchPassword(user.user.id, password.data, newPassword.data)
    }

    return (
        <div className='lists'>
            <div className='listsTitle'>Profile</div>
            <div className='profileContainer'>
                <div className="profileDash">
                    <div className="profileSwitchPasswordTitle">Смена пароля</div>
                    <PasswordInput label="Старый пароль *" password={password}/>
                    <PasswordInput label="Новый пароль *" password={newPassword} />
                    <Button
                        sx={{width: "100%", mt: "25px", mb: "25px"}}
                        className="switchPasswordBautton"
                        variant="contained"
                        onClick={() => switchClick()}
                        disabled={!password.isValid || !newPassword.isValid}
                    >
                        Поменять пароль
                    </Button>
                    <CustomSnackbarError />
                    {
                        success && !error && <CustomSnackbarSuccess text="Пароль успешно изменен"/>
                    }
                </div>
                <MenuList />
                <PersonMenu />
            </div>
        </div>
      )
}

export default Profile