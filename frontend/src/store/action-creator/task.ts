import { Dispatch } from "react"
import TaskService from "../../services/TaskService"
import { TaskAction, TaskTypes } from "../../types/taskTypes"

export const addTask = (complite: boolean, body: string, TaskListModelId: number) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            dispatch({type: TaskTypes.FETCH_TASK})
            const response = await TaskService.add(complite, body, TaskListModelId)            
            dispatch({type: TaskTypes.FETCH_TASK_ADD, payload: response.data})
        } catch (e) {
            dispatch({
                type: TaskTypes.FETCH_TASK_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}
export const getTask = (TaskListModelId: number) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            dispatch({type: TaskTypes.FETCH_TASK})
            const response = await TaskService.get(TaskListModelId)   
            dispatch({type: TaskTypes.FETCH_TASK_GET, payload: response.data})       
        } catch (e) {
            dispatch({
                type: TaskTypes.FETCH_TASK_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}

export const updateTask = (id: number, complite: boolean, body: string, TaskListModelId: number) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            dispatch({type: TaskTypes.FETCH_TASK})
            const response = await TaskService.update(id, complite, body, TaskListModelId)            
            dispatch({type: TaskTypes.FETCH_TASK_UPDATE, payload: response.data})
        } catch (e) {
            dispatch({
                type: TaskTypes.FETCH_TASK_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}

export const deleteTask = (id: number, TaskListModelId: number) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            dispatch({type: TaskTypes.FETCH_TASK})
            const response = await TaskService.delete(id, TaskListModelId)            
            dispatch({type: TaskTypes.FETCH_TASK_DELETE, payload: id})
        } catch (e) {
            dispatch({
                type: TaskTypes.FETCH_TASK_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}
