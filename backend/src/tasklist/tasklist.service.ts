import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { DeleteTaskListDto } from './DeleteTaskList.dto';
import { CreateTaskListDto } from './dto/CreateTastList.dto';
import { UpdateTaskListDto } from './dto/UpdateTaskList.dto';
import { TaskList } from '../models/tasklist.model';

@Injectable()
export class TasklistService {
  constructor(
    @InjectModel(TaskList) private readonly TaskListRepository: typeof TaskList,
    private userService: UserService,
  ) {}

  async Create(dto: CreateTaskListDto) {
    const user = await this.userService.getUserById(dto.userId);
    const List = await this.TaskListRepository.create({
      title: dto.title,
      UserId: user.id,
    });
    return List;
  }

  async getByUserId(id: number) {
    const Lists = await this.TaskListRepository.findAll({
      where: { UserId: id },
    });
    return Lists;
  }
  async updateList(dto: UpdateTaskListDto) {
    const newList = await this.TaskListRepository.findByPk(dto.listId);
    if (!newList)
      throw new HttpException('List not found', HttpStatus.NOT_FOUND);
    await newList.update({ title: dto.title });
    return newList;
  }
  async deleteList(dto: DeleteTaskListDto) {
    const List = await this.TaskListRepository.findByPk(dto.listId);
    if (!List) throw new HttpException('List not found', HttpStatus.NOT_FOUND);
    await List.destroy();
    return List;
  }
}
