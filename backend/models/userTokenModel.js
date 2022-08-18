import { DataTypes, Model } from "sequelize";

class userTokenModel extends Model {
    static register(sequelize){
        this.init(
            {
                refreshToken: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: "UserToken",
                timestamps: false
            }
        )
    }
}

export default userTokenModel;