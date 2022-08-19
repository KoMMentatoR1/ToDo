import { ITaskState, TaskAction, TaskTypes } from "../../types/taskTypes"

const initialState: ITaskState = {
    isLoading: false,
    error: "",
    tasks: []
}

export const taskReducer = (state = initialState, action: TaskAction): ITaskState => {
    switch(action.type){
        case TaskTypes.FETCH_TASK:
            return {isLoading: true, error: null, tasks: [...state.tasks]}
        case TaskTypes.FETCH_TASK_ADD:
            return {isLoading: false, error: null, tasks: [...state.tasks, action.payload]}
        case TaskTypes.FETCH_TASK_GET:
            return {isLoading: false, error: null, tasks: [...action.payload]}
        case TaskTypes.FETCH_TASK_UPDATE:
            return {isLoading: false, error: null, tasks: [...state.tasks.map((el) => (el.id === action.payload.id ? action.payload : el))]}
        case TaskTypes.FETCH_TASK_DELETE:
            return {isLoading: false, error: null, tasks: [...state.tasks.filter((el) => ( action.payload !== el.id ))]}
        case TaskTypes.FETCH_TASK_ERROR:
            return {isLoading: false, error: action.payload, tasks:[]}
        default:
            return state 
    }
}