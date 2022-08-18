import "../less/menu.less"
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { FC, } from "react";

import { useAction } from "../hooks/useAction";

const PersonList: FC = () => {
    const {logout} = useAction()
    const exit = () => {
        logout()
    }

  return (
    <div className="menu menu--left">
        <div className="menuItemContainer">
            <PersonIcon
              sx={{transition: "color .1s linear,  background .1s linear, border .1s linear, box-shadow .1s linear"}}
              className="menuItem"
              id="person"
            />
        </div>
        <div className="menuItemContainer">
            <ExitToAppIcon
                onClick={() => exit()}
                sx={{transition: "color .1s linear,  background .1s linear, border .1s linear, box-shadow .1s linear"}}
                className="menuItem"
            />
        </div>
    </div>
  )
}

export default PersonList