import {Op} from "sequelize"
import TokenListDto from "../dtos/tokenList-dto.js"
import TaskListModel from "../models/taskListModel.js"

class taskListService{
    async add(title, userId){
        const newList = await TaskListModel.create({title, UserId: userId})
        return newList
    }

    async get(userId){
        const lists = await TaskListModel.findAll({where: {UserId: userId}})
        return lists
    }

    async update(listId, userId, title){
        const newList = await TaskListModel.findOne({where: {UserId: userId, id: listId}})
        newList.title = title
        await newList.save()
        const list = new TokenListDto(newList)
        return list
    }

    async delete(listId, userId){
        const list = await TaskListModel.destroy({where: {UserId: userId, id: {[Op.or]: [listId]} }})
        return list
    }

}

export default new taskListService