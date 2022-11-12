import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from '../models/user.model';
import * as uuid from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private mailService: MailService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const acticationLink = uuid.v4();
    await user.update({ acticationLink });
    this.mailService.sendActivation(user.email, user.acticationLink);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user) return user;
    throw new HttpException('пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async activate(link: string) {
    const user = await this.userRepository.findOne({
      where: { acticationLink: link },
    });
    if (user) {
      user.update({ isActivated: true });
      return user;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }
}
