import $api from "../http";
import { AxiosResponse } from "axios";
import { TaskResponse } from "../models/response/TaskResponse";

export default class TaskService {
    static async add(complite: boolean, body: string, TaskListModelId: number): Promise<AxiosResponse<TaskResponse>> {
        return $api.post<TaskResponse>("tasks/add", {complite, body, TaskListModelId})
    }

    static async get(TaskListModelId: number): Promise<AxiosResponse<TaskResponse[]>> {
        return $api.get<TaskResponse[]>(`tasks/all/${TaskListModelId}`)
    }

    static async update(id: number, complite: boolean, body: string, taskListId: number ): Promise<AxiosResponse<TaskResponse>> {
        return $api.put<TaskResponse>(`tasks/update/${id}`, {complite, body, taskListId})
    }

    static async delete(id: number, taskListId: number): Promise<AxiosResponse<TaskResponse>> {
        return $api.delete<TaskResponse>(`tasks/delete/${id}`, {data: {taskListId} })
    }
}