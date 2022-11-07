import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Task } from 'src/tasks/task.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'taskList', timestamps: false, freezeTableName: true })
export class TaskList extends Model<TaskList> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ForeignKey(() => User)
  UserId: number;

  @BelongsTo(() => User)
  User: User;

  @HasMany(() => Task)
  Task: Task[];
}
