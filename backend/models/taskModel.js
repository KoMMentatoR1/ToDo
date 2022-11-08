import { DataTypes, Model  } from "sequelize";

class TaskModel extends Model {
    static register(sequelize){
        this.init(
            {
                complite: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                body: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: "Task",
                timestamps: false
            }
        )
    }
}

export default TaskModel