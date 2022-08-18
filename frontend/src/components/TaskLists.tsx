import { FC, useEffect } from 'react'
import { useAction } from '../hooks/useAction'
import { useTypeSelector } from '../hooks/useTypeSelector'
import "../less/card.less"
import TaskListItem from './TaskListItem'

const TaskLists: FC = () => {

  const {taskLists} = useTypeSelector(store => store.taskList)
  const {user} = useTypeSelector(store => store.user)
  const {getTaskList} = useAction()
  
  useEffect(() => {
    getTaskList(user.user.id)
  }, [])

  return (
    <div className='card'>
        {taskLists.map((card, index) => (
          <TaskListItem
            id={card.id}
            title={card.title}
            userId={card.userId}
            key={index}
          />
        ))}
    </div>

  )
}

export default TaskLists