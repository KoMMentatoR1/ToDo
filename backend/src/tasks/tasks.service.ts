import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { Task } from '../models/task.model';
import { TaskList } from 'src/models/tasklist.model';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskRepository: typeof Task,
    @InjectModel(TaskList) private readonly taskListRepository: typeof TaskList,
    private readonly tokenService: TokenService,
  ) {}

  async add(dto: CreateTaskDto) {
    const newTask = await this.taskRepository.create({
      complite: dto.complite,
      body: dto.body,
      TaskListId: dto.TaskListModelId,
    });
    return newTask;
  }

  async getByListId(ListId: number, authorization: string) {
    const decoded = await this.tokenService.getDataFromToken(authorization);

    const tasklist = await this.taskListRepository.findByPk(ListId);

    if (!tasklist)
      throw new HttpException('Лист не найден', HttpStatus.NOT_FOUND);

    if (tasklist.UserId !== decoded.id)
      throw new HttpException(
        'Лист не принадлежит этому пользователю',
        HttpStatus.NOT_FOUND,
      ); //fix

    const task = await this.taskRepository.findAll({
      where: { TaskListId: ListId },
    });

    if (!task)
      throw new HttpException('Задачи не найдены', HttpStatus.NOT_FOUND);

    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findByPk(id);
    if (!task)
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    const taskList = await this.taskListRepository.findByPk(dto.taskListId);
    if (!taskList)
      throw new HttpException('Лист задач не найден', HttpStatus.NOT_FOUND);

    const newTask = await this.taskRepository.findByPk(id);
    newTask.update({ complite: dto.complite, body: dto.body });
    return newTask;
  }

  async delete(id: number, taskListId: number) {
    const task = await this.taskRepository.findByPk(id);
    if (!task)
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    const taskList = await this.taskListRepository.findByPk(taskListId);
    if (!taskList)
      throw new HttpException('Лист задач не найден', HttpStatus.NOT_FOUND);
    if (task.TaskListId !== taskListId)
      throw new HttpException(
        'Задача не принадлежит листу задач',
        HttpStatus.NOT_FOUND,
      );
    await task.destroy();
    return task;
  }
}
