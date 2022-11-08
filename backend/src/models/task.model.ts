import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TaskList } from 'src/models/tasklist.model';

@Table({ tableName: 'tasks', timestamps: false, freezeTableName: true })
export class Task extends Model<Task> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  complite: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  body: string;

  @ForeignKey(() => TaskList)
  TaskListId: number;

  @BelongsTo(() => TaskList)
  TaskList: TaskList;
}
