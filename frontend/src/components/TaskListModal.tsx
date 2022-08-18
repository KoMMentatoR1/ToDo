import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "../less/cardModal.less"
import { ITask } from "../types/types";
import Task from './Task';

interface IModal {
  open: boolean,
  onClose: () => void,
  title: string,
}

const TaskListModal = ({open, onClose, title}: IModal) => {

  const task:Array<ITask> = [
    {label: '123', checked: true},
    {label: '1234', checked: false},
    {label: '123', checked: true},
    {label: '123', checked: true},
    {label: '123', checked: true},
    {label: '123', checked: true},
  ]

  return (
    <div>
      <Modal
        open={open}
        onClose={() => onClose()}
      >
        <Box className='cardModal'>
          <div className='cardModalTitle'>
            {title}
          </div>
          <form className="cardModalForm">
            {task.map((task) => (
              <Task label={task.label} checked={task.checked}/>
            ))}
          </form>
        </Box>
      </Modal>  
    </div>
  );
}

export default TaskListModal
