import "../less/menu.less"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { useAction } from "../hooks/useAction";
import AddModal from "./AddModal";

const buttonStyle = {
  borderRadius:"50%",
  m: "10px 0 10px",
  p: "10px",
  minHeight: "50px",
  minWidth: "50px"
}

const MenuList = () => {

  const {isEdit, isClear, addModal, selectedTaskList} = useTypeSelector(store => store.tool)
  const {user} = useTypeSelector(store => store.user)
  const {setDefaultTool, toolActiveClear, toolActiveEdit, toolAddModalActive, deleteTaskList} = useAction()

  const [open, setOpen] = useState<boolean>(false) // Открытие модалки

  const handleCloseModal = () => {
    setDefaultTool()
    setOpen(false)
  }

  const editClick = () => { // обработка клика на кнопку edit
    if (isEdit) {
      setDefaultTool()
    }
    else {
      toolActiveEdit()
    }
  }

  const clearClick = () => { // обработка клика на кнопку delete
    if (isClear) {
      setDefaultTool()
    }
    else {
      toolActiveClear()
    }
  }

  const addClick = () => { // обработка клика на кнопку add
    setOpen(true)
    toolAddModalActive()
  }

  return (
    <div className="menu menu--right">
        <div className="menuItemContainer">
            <EditIcon
              sx={{transition: "color .1s linear,  background .1s linear, border .1s linear, box-shadow .1s linear"}}
              className={`menuItem ${isEdit ? "active" : ""}`}
              id="edit"
              onClick={() => editClick()}
            />
            <DeleteIcon
              sx={{transition: "color .1s linear,  background .1s linear, border .1s linear, box-shadow .1s linear"}}
              id="delete"
              className={`menuItem ${isClear? "active" : ""}`}
              onClick={() => clearClick()}
            />
            <AddIcon
              sx={{transition: "color .1s linear,  background .1s linear, border .1s linear, box-shadow .1s linear"}}
              id="add"
              className={`menuItem ${addModal? "active" : ""}`}
              onClick={() => addClick()}
            />
        </div>
        
        {isClear
          ?(
              <div className="menuItemContainer">
                <Button disabled={selectedTaskList.length === 0} sx={buttonStyle} variant="contained" color="success" onClick={() => deleteTaskList(selectedTaskList, user.user.id)}>
                  <CheckIcon />
                </Button>
                <Button variant="contained" color="error" sx={buttonStyle}  onClick={() => setDefaultTool()}>
                  <ClearRoundedIcon  />
                </Button>  
              </div>
          )
          :(
            ""
          )
        }

        {addModal
          ?(
            <AddModal open={open} onClose={() => handleCloseModal()}/>
          )
          :(
            ""
          )  
        }

    </div>
  )
}

export default MenuList