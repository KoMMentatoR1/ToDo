import TokenDto from "../dtos/task-dto.js"
import TaskModel from "../models/TaskModel.js"

class taskService{
    async add(complite, body, TaskListModelId){
        const newTask = await TaskModel.create({complite, body, TaskListModelId})
        return newTask
    }

    async get(TaskListModelId){
        const task = await TaskModel.findAll({where: {TaskListModelId}})
        return task
    }

    async update(id, complite, body, TaskListModelId){
        const newTask = await TaskModel.findOne({where: {id, TaskListModelId}})
        newTask.complite = complite
        newTask.body = body
        await newTask.save()
        const task = new TokenDto(newTask)
        return task
    }

    async delete(id, TaskListModelId){
        const task = await TaskModel.destroy({where: {id, TaskListModelId}})
        return task
    }

}

export default new taskService