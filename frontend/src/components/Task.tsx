import "../less/task.less"
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React, { ChangeEvent, FC, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskResponse } from "../models/response/TaskResponse";
import { useAction } from "../hooks/useAction";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


const Task: FC<TaskResponse> = ({id, complite, body, TaskListModelId}) => {

  const {updateTask, deleteTask} = useAction() 

  const [editTask, setEditTask] = useState<boolean>(false) // Состояние режима таска
  const [value, setValue] = useState<string>("") // Значение изменения названия таска

  const checkTaskClick = () => {     // Изменение завершенности таска
    if(complite) {
      updateTask(id, false, body, TaskListModelId)
    }
    else {
      updateTask(id, true, body, TaskListModelId)
    }
  }

  const deleteTaskClick = (e: React.MouseEvent<HTMLButtonElement>) => { // удаление таска
    e.preventDefault()
    deleteTask(id, TaskListModelId)
  }

  const editTaskClick = (e: React.MouseEvent<HTMLButtonElement>) => { // Включение редактирования таска
    e.preventDefault()
    setEditTask(true)
  }

  const doneTaskEdit = () => { // Изменение названия таска
    updateTask(id, complite, value, TaskListModelId)
    setEditTask(false)
  }

  if (editTask) {
    return (
      <FormControl variant="standard"> 
          <InputLabel htmlFor="addTaskInput">Введите новое название задачи</InputLabel>
          <Input
            sx={{width: "100%"}}
            value={value}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            id="addTaskInput"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => doneTaskEdit()}>
                  <DoneIcon color="success" />
                </IconButton>
                <IconButton onClick={() => setEditTask(false)} >
                  <CloseIcon color="error" />
                </IconButton>
              </InputAdornment>
            }
          />
       </FormControl>
    )
  }
  else {
    return(
      <div className='task' style={{textDecoration: complite ? "line-through" : "none"}}>
          <FormControlLabel
          sx={{ '& .MuiTypography-root': { fontSize: 25 } }}
          label={body}
          control={<Checkbox checked={complite}
          onClick={() => checkTaskClick()}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 33 } }}
          />}/>
          <div>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => editTaskClick(e)}  className="taskEditButton">
              <EditIcon sx={{fontSize: "30px"}} />
            </button>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteTaskClick(e)} className="taskDeleteButton">
              <DeleteIcon sx={{fontSize: "30px"}} />
            </button>
          </div>
    </div>
    ) 
  }
}
export default Task