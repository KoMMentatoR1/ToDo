import { DataTypes, Model  } from "sequelize";

class TaskListModel extends Model {
    static register(sequelize){
        this.init(
            {
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: "TaskList",
                timestamps: false
            }
        )
    }
}

export default TaskListModel
