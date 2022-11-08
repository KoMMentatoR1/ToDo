import { TaskResponse } from "../models/response/TaskResponse";

export interface ITaskState{
    isLoading: boolean,
    error: string | null,
    tasks: TaskResponse[]
}

export enum TaskTypes {
    FETCH_TASK="FETCH_TASK",
    FETCH_TASK_ADD="FETCH_TASK_ADD",
    FETCH_TASK_GET="FETCH_TASK_GET",
    FETCH_TASK_UPDATE="FETCH_TASK_UPDATE",
    FETCH_TASK_DELETE="FETCH_TASK_DELETE",
    FETCH_TASK_ERROR="FETCH_TASK_ERROR",
    FETCH_TASK_WITHOUT_LOADING="FETCH_TASK_WITHOUT_LOADING"
}

interface FetchTask{
    type: TaskTypes.FETCH_TASK
}

interface FetchTaskWithoutLoading{
    type: TaskTypes.FETCH_TASK_WITHOUT_LOADING
}

interface FetchTaskAdd{
    type: TaskTypes.FETCH_TASK_ADD,
    payload: TaskResponse
}

interface FetchTaskGet{
    type: TaskTypes.FETCH_TASK_GET,
    payload: TaskResponse[]
}

interface FetchTaskUpdate{
    type: TaskTypes.FETCH_TASK_UPDATE,
    payload: TaskResponse
}

interface FetchTaskDelete{
    type: TaskTypes.FETCH_TASK_DELETE,
    payload: number
}

interface FetchTaskError{
    type: TaskTypes.FETCH_TASK_ERROR,
    payload: string
}


export type TaskAction = FetchTask | FetchTaskWithoutLoading | FetchTaskAdd | FetchTaskGet | FetchTaskUpdate | FetchTaskDelete | FetchTaskError