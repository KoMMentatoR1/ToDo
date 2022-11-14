import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { DeleteTaskDto } from './dto/DeleteTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async add(dto: CreateTaskDto) {
    const newTask = await this.taskRepository.create({
      complite: dto.complite,
      body: dto.body,
      TaskListId: dto.TaskListId,
    });
    return newTask;
  }

  async getByListId(id: number) {
    const task = await this.taskRepository.findAll({
      where: { TaskListId: id },
    });
    if (!task) throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND);
    return task;
  }

  async update(dto: UpdateTaskDto) {
    const newTask = await this.taskRepository.findByPk(dto.TaskId);
    newTask.update({ complite: dto.complite, body: dto.body });
    return newTask;
  }

  async delete(dto: DeleteTaskDto) {
    const task = await this.taskRepository.findByPk(dto.TaskId);
    if (!task) throw new HttpException('List not found', HttpStatus.NOT_FOUND);
    await task.destroy();
    return task;
  }
}
