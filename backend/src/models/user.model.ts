import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TaskList } from 'src/models/tasklist.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users', timestamps: false, freezeTableName: true })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  switchKey: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  acticationLink: string;

  @HasMany(() => TaskList)
  TaskList: TaskList[];
}
