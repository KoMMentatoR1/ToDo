import { DataTypes, Model } from "sequelize";

class UserModel extends Model {
    static register(sequelize){
        this.init(
            {
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isActivated: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                activationLink: {
                    type: DataTypes.STRING
                },
                switchKey: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize,
                modelName: "User",
                timestamps: false
            }
        )
    }
}

export default UserModel;