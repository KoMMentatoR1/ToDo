import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { DeleteTaskListDto } from './dto/DeleteTaskList.dto';
import { CreateTaskListDto } from './dto/CreateTastList.dto';
import { UpdateTaskListDto } from './dto/UpdateTaskList.dto';
import { TaskList } from '../models/tasklist.model';
import { Op } from 'sequelize';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/models/user.model';

@Injectable()
export class TasklistService {
  constructor(
    @InjectModel(TaskList) private readonly taskListRepository: typeof TaskList,
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async Create(dto: CreateTaskListDto) {
    const user = await this.userService.getUserById(dto.userId);
    const List = await this.taskListRepository.create({
      title: dto.title,
      UserId: user.id,
    });
    return List;
  }

  async getByUserId(id: number, authorization: string) {
    const decoded = await this.tokenService.getDataFromToken(authorization)
    const Lists = await this.taskListRepository.findAll({
      where: { UserId: decoded.id },
    });
    return Lists;
  }
  async updateList(id: number, dto: UpdateTaskListDto) {
    const taskList = await this.taskListRepository.findByPk(id)
    if (!taskList) throw new HttpException('Лист задач не найден', HttpStatus.NOT_FOUND);

    const user = await this.userRepository.findByPk(dto.userId)
    if (!user) throw new HttpException('Юзер не найден', HttpStatus.NOT_FOUND);

    const newList = await this.taskListRepository.findByPk(id);
    if (!newList)
      throw new HttpException('Лист задач не найден', HttpStatus.NOT_FOUND);
    await newList.update({ title: dto.title });
    return newList;
  }
  async deleteList(dto: DeleteTaskListDto) {
    const List = await this.taskListRepository.destroy({
      where: {
        UserId: dto.userId,
        id: {
          [Op.or]: [...dto.listId]
        }
      }
    })
    return List;
  }
}
