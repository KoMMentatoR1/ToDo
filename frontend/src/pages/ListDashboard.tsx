import MenuList from '../components/MenuList'
import PersonMenu from '../components/PersonMenu'
import TaskLists from '../components/TaskLists'
import "../less/lists.less"


const ListDashboard = () => {

  return (
    <div className='lists'>
        <div className='listsTitle'>My Lists</div>
        <div className='listsContainer'>
            <TaskLists />
            <MenuList />
            <PersonMenu />
        </div>
    </div>
  )
}

export default ListDashboard