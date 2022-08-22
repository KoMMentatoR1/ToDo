import "../less/menu.less"
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { FC, } from "react";

import { useAction } from "../hooks/useAction";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { useNavigate } from "react-router-dom";

const PersonList: FC = () => {

    const navigator = useNavigate()

    const {logout, toolActiveProfile, setDefaultTool} = useAction()
    const {isProfile} = useTypeSelector(state => state.tool)
    const exit = () => {
        logout()
        setDefaultTool()
    }

    const personClick = () => {
      if(isProfile) {
        navigator("/myLists")
        setDefaultTool()
      }
      else {
        navigator("/profile")
        toolActiveProfile()
      }
    }

  return (
    <div className="menu menu--left">
        <div className="menuItemContainer">
            <PersonIcon
              sx={{transition: "color .1s linear,  background .1s linear, border .1s linear, box-shadow .1s linear"}}
              className={`menuItem ${isProfile ? "active" : ""}`}
              id="person"
              onClick={() => personClick()}
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