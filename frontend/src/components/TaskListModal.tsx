import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "../less/cardModal.less"
import "../less/menu.less"
import { ITask } from "../types/types";
import Task from './Task';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, FC, useState, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useAction } from '../hooks/useAction';
import { useTypeSelector } from '../hooks/useTypeSelector';
import Loader from './Loader';

interface IModal {
  open: boolean,
  onClose: () => void,
  title: string,
  idList: number
}

const TaskListModal: FC<IModal> = ({idList, open, onClose, title}) => {

  const {getTask, addTask} = useAction()
  const {tasks, isLoading} = useTypeSelector(state => state.task)
  const {user} = useTypeSelector(state => state.auth)

  useEffect(() => {
    if(open){
      getTask(idList, user.user.id)
    }
  }, [open])

  const [inputActive, setInputActive] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  const addTaskClick = () => {
    addTask(false, value, idList),
    setInputActive(false)
    setValue("")
  }
  
  return (
    <div>
      <Modal
        open={isLoading ? true : open}
        onClose={() => onClose()}
      >
        <Box className='cardModal'>
          <div className='cardModalTitle'>
            {isLoading ? "" : title}
          </div>
          {isLoading
          ?(<Loader />)
          : (
            <form className="cardModalForm">

            {tasks.map((task) => (
              <Task
                id={task.id}
                complite={task.complite}
                body={task.body}
                TaskListId={task.TaskListId}
                key={task.id}
              />
            ))}

            {inputActive
              ?(
                <FormControl variant="outlined"> 
                <InputLabel htmlFor="addTaskInput">Введите новую задачу</InputLabel>
                <OutlinedInput
                  value={value}
                  onChange={(e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                  id="addTaskInput"
                  label="Введите новую задачу"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => addTaskClick()}>
                        <DoneIcon color="success" />
                      </IconButton>
                      <IconButton onClick={() => {setInputActive(false); setValue("")}} >
                        <CloseIcon color="error" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              )
              :(
                <AddIcon
                sx={{transition: "color .1s linear,  background .1s linear, border .1s linear, box-shadow .1s linear"}}
                className="menuItem"
                onClick={() => setInputActive(true)}
              />
              )
            }

            </form>
          )
          }
        </Box>
      </Modal>  
    </div>
  );
}

export default TaskListModal
