import React, {FC, useState} from 'react';
import "../less/card.less";
import TaskListModal from './TaskListModal';
import ModalEdit from './ModalEdit';
import { TaskListResponse } from '../models/response/TaskListResponse';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { useAction } from '../hooks/useAction';

const TaskListItem: FC<TaskListResponse> = ({id, title, userId}) => {
  const {selectedTaskList, taskListModal, editModal, isClear} = useTypeSelector(store => store.tool)

  const {toolSelectCard, toolRejectCard} = useAction()

  const [open, setOpen] = useState<boolean>(false) // Состояние модалки

  const handleCloseModal = () => { // закрытие модалки
    setOpen(false)
  }

  const isActive = () : boolean => { // выбор карточек
    for (let i of selectedTaskList) {
      if (id === i){
        return true
      }
    }
    return false
  }

  const toolListClick = () => { // обработка нажатий по карточкам
    if(!isClear){
      setOpen(true)
    }
    else{
      for (let i of selectedTaskList) {
        if (id === i){
          toolRejectCard(id)
          return
        }
      }
      toolSelectCard(id)
    }
  }

  return (
    <div style={{width: "30%"}}>
      <div className={`cardItem ${isActive() ? "active" : ""}`} id={"Card" + id} onClick={() => toolListClick()}>
        {title}
      </div>
      {taskListModal
      ?(
        <TaskListModal open={open} title={title} onClose={() => handleCloseModal()} /> 
      )
      : ""
      }
      {editModal
      ?(
        <ModalEdit cardId={id} open={open} title={title} onClose={() => handleCloseModal()} />
      )
      : ""
      }
    </div>    
  )
}

export default TaskListItem