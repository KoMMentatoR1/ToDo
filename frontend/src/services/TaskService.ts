import $api from "../http";
import { AxiosResponse } from "axios";
import { TaskResponse } from "../models/response/TaskResponse";

export default class TaskService {
    static async add(complite: boolean, body: string, TaskListModelId: number): Promise<AxiosResponse<TaskResponse>> {
        return $api.post<TaskResponse>("tasks/add", {complite, body, TaskListModelId})
    }

    static async get(TaskListModelId: number): Promise<AxiosResponse<TaskResponse[]>> {
        return $api.post<TaskResponse[]>("tasks/get", {TaskListModelId})
    }

    static async update(id: number, complite: boolean, body: string, TaskListModelId: number ): Promise<AxiosResponse<TaskResponse>> {
        return $api.post<TaskResponse>("tasks/update", {id, complite, body, TaskListModelId})
    }

    static async delete(id: number, TaskListModelId: number): Promise<AxiosResponse<TaskResponse>> {
        return $api.post<TaskResponse>("tasks/delete", {id, TaskListModelId })
    }
}