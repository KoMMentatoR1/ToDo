import { Sequelize } from "sequelize";
import TaskListModel from "./models/taskListModel.js";
import TaskModel from "./models/TaskModel.js";
import UserModel from "./models/userModel.js";
import userTokenModel from "./models/userTokenModel.js";

export async function db_connect() {
    const sequelize = new Sequelize(
        process.env.DB_NAME || "postgres",
        process.env.DB_USER || "postgres",
        process.env.DB_PASSWORD || "145415",
        {
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || "5432",
            dialect: "postgres",
            freezeTableName: true
        }
    )

    try{
        await sequelize.authenticate()
        const models = [UserModel, userTokenModel, TaskListModel, TaskModel]

        for (const model of models) {
            model.register(sequelize)
        }

        UserModel.hasOne(userTokenModel)
        userTokenModel.belongsTo(UserModel)

        UserModel.hasMany(TaskListModel)
        TaskListModel.belongsTo(UserModel)

        TaskListModel.hasMany(TaskModel)
        TaskModel.belongsTo(TaskListModel)

        sequelize.sync()

    } catch(e) {
        console.log("Невозможно выполнить связь с БД" + e);
    }
}
