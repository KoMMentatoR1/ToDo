import { TaskListResponse } from "../models/response/TaskListResponse";

export interface ITaskListState {
    isLoading: boolean;
    error: null | string;
    taskLists: TaskListResponse[]
}

export enum TaskListTypes{
    FETCH_TASKLIST = "FETCH_TASKLIST",
    FETCH_TASKLIST_ADD = "FETCH_TASKLIST_ADD",
    FETCH_TASKLIST_GET = "FETCH_TASKLIST_GET",
    FETCH_TASKLIST_UPDATE = "FETCH_TASKLIST_UPDATE",
    FETCH_TASKLIST_DELETE = "FETCH_TASKLIST_DELETE",
    FETCH_TASKLIST_ERROR = "FETCH_TASKLIST_ERROR",
}

interface FetchTaskList{
    type: TaskListTypes.FETCH_TASKLIST
}

interface FetchTaskListAdd{
    type: TaskListTypes.FETCH_TASKLIST_ADD,
    payload: TaskListResponse,
}

interface FetchTaskListGet{
    type: TaskListTypes.FETCH_TASKLIST_GET,
    payload: TaskListResponse[]
}

interface FetchTaskListUpdate{
    type: TaskListTypes.FETCH_TASKLIST_UPDATE,
    payload: TaskListResponse
}

interface FetchTaskListDelete{
    type: TaskListTypes.FETCH_TASKLIST_DELETE,
    payload: number[]
}

interface FetchTaskListError{
    type: TaskListTypes.FETCH_TASKLIST_ERROR,
    payload: string
}

export type TaskListAction = FetchTaskList | FetchTaskListAdd | FetchTaskListGet | FetchTaskListUpdate | FetchTaskListDelete | FetchTaskListError