import taskService from "../services/taskService.js"

class taskController {
    static async add(req, res, next){
        try{
            const { complite, body, TaskListModelId } = req.body
            const newTask = await taskService.add(complite, body, TaskListModelId)
            return  res.json(newTask)
        } catch(e){
            next(e)
        }
    }

    static async get(req, res, next) {
        try{
            const { TaskListModelId } = req.body
            const task = await taskService.get( TaskListModelId )
            return  res.json(task)
        } catch(e){
            next(e)
        }
    }

    static async update(req, res, next) {
        try{
            const { id, complite, body, TaskListModelId } = req.body
            const newTask = await taskService.update(id, complite, body, TaskListModelId)
            return  res.json(newTask)
        } catch(e){
            next(e)
        }
    }

    static async delete(req, res, next) {
        try{
            const { id, TaskListModelId } = req.body
            const response = await taskService.delete(id, TaskListModelId)
            return  res.status(200).json(response)
        } catch(e){
            next(e)
        }
    }
}

export default taskController