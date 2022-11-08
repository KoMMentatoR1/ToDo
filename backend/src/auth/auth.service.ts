import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { MailService } from 'src/mail/mail.service';
import { SwitchPassDto } from './dto/switchPass.dto';
import { newPassDto } from './dto/newPass.dto';
import { OutputUserDto } from './dto/outputUser.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async switchPass(dto: SwitchPassDto) {
    const user = await this.userService.getUserById(dto.id);

    const isPassEquils = await bcrypt.compare(dto.password, user.password);

    if (isPassEquils) {
      throw new HttpException(
        'Предыдущий пароль совпадает с новым',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.newPass, 3);
    await user.update({ password: hashPassword });

    const userDto = new OutputUserDto(user);
    const tokens = this.generateToken(user);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async forgotPass(email: string) {
    const user = await this.userService.getUserByEmail(email);
    const key = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    await user.update({ switchKey: key });
    await this.mailService.sendSwitchPasswordCodeMail(email, key);

    return;
  }

  async newPass(dto: newPassDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (user.switchKey != dto.code) {
      throw new HttpException('Неверный код', HttpStatus.BAD_REQUEST);
    }

    user.switchKey = null;
    const hashPassword = await bcrypt.hash(dto.newPass, 3);

    await user.update({ password: hashPassword });

    const userDto = new OutputUserDto(user);
    const tokens = this.generateToken(user);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(value: string) {
    return this.userService.activate(value)
  }
}
