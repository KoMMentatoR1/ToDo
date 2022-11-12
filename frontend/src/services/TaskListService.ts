import $api from "../http";
import { AxiosResponse } from "axios";
import { TaskListResponse } from "../models/response/TaskListResponse";

export default class TaskListService {
    static async add(title: string, userId: number): Promise<AxiosResponse<TaskListResponse>> {
        return $api.post<TaskListResponse>("tasklist/add", {title, userId})
    }

    static async get(userId: number): Promise<AxiosResponse<TaskListResponse[]>> {
        return $api.get<TaskListResponse[]>(`tasklist/get/${userId}`)
    }

    static async update(listId: number, userId: number, title: string): Promise<AxiosResponse<TaskListResponse>> {
        return $api.put<TaskListResponse>(`tasklist/update/${listId}`, {userId, title})
    }

    static async delete( listId: number[], userId: number ): Promise<AxiosResponse<TaskListResponse>> {
        return $api.post<TaskListResponse>("tasklist/delete", {listId, userId})
    }
}