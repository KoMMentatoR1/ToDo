import { Dispatch } from "react"
import TaskListService from "../../services/TaskListService"
import { TaskListAction, TaskListTypes } from "../../types/taskListTypes"

export const addTaskList = (title: string, userId: number) => {
    return async (dispatch: Dispatch<TaskListAction>) => {
        try {
            dispatch({type: TaskListTypes.FETCH_TASKLIST})
            const response = await TaskListService.add(title, userId)            
            dispatch({type: TaskListTypes.FETCH_TASKLIST_ADD, payload: response.data})
        } catch (e) {
            dispatch({
                type: TaskListTypes.FETCH_TASKLIST_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}
export const getTaskList = (userId: number) => {
    return async (dispatch: Dispatch<TaskListAction>) => {
        try {
            dispatch({type: TaskListTypes.FETCH_TASKLIST})
            const response = await TaskListService.get(userId)            
            dispatch({type: TaskListTypes.FETCH_TASKLIST_GET, payload: response.data})
        } catch (e) {
            dispatch({
                type: TaskListTypes.FETCH_TASKLIST_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}

export const updateTaskList = (listId: number, userId: number, title: string) => {
    return async (dispatch: Dispatch<TaskListAction>) => {
        try {
            dispatch({type: TaskListTypes.FETCH_TASKLIST})
            const response = await TaskListService.update(listId, userId, title)            
            dispatch({type: TaskListTypes.FETCH_TASKLIST_UPDATE, payload: response.data})
        } catch (e) {
            dispatch({
                type: TaskListTypes.FETCH_TASKLIST_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}

export const deleteTaskList = (listId: number[], userId: number) => {
    return async (dispatch: Dispatch<TaskListAction>) => {
        try {
            dispatch({type: TaskListTypes.FETCH_TASKLIST})
            const response = await TaskListService.delete(listId, userId)            
            dispatch({type: TaskListTypes.FETCH_TASKLIST_DELETE, payload: listId})
        } catch (e) {
            dispatch({
                type: TaskListTypes.FETCH_TASKLIST_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}
