import taskListService from "../services/taskListService.js"

class taskListController {
    static async add(req, res, next){
        try{
            const { title, userId } = req.body
            const newList = await taskListService.add(title, userId)
            return  res.json(newList)
        } catch(e){
            next(e)
        }
    }

    static async get(req, res, next) {
        try{
            const { userId } = req.body
            const lists = await taskListService.get(userId)
            return  res.json(lists)
        } catch(e){
            next(e)
        }
    }

    static async update(req, res, next) {
        try{
            const { listId, userId, title } = req.body
            const newList = await taskListService.update(listId, userId, title)
            return  res.json(newList)
        } catch(e){
            next(e)
        }
    }

    static async delete(req, res, next) {
        try{
            const { listId, userId } = req.body
            const response = await taskListService.delete(listId, userId)
            return  res.status(200).json(response)
        } catch(e){
            next(e)
        }
    }
}

export default taskListController