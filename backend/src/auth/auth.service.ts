import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UserService } from 'src/user/user.service';
import { newPassDto } from './dto/newPass.dto';
import { OutputUserDto } from './dto/outputUser.dto';
import { SwitchPassDto } from './dto/switchPass.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с такой почтой уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return {
      token: await this.tokenService.generateToken(user),
      user: { ...new OutputUserDto(user) },
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
      message: 'Некорректная почта или пароль',
    });
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    const token = await this.tokenService.generateToken(user);

    return {
      token,
      user: { ...new OutputUserDto(user) },
    };
  }

  async switchPass(dto: SwitchPassDto) {
    const user = await this.userService.getUserById(dto.id);

    const isPassEquils = await bcrypt.compare(dto.password, user.password);

    if (!isPassEquils) {
      throw new HttpException('Неверный старый пароль', HttpStatus.BAD_REQUEST);
    }

    const isNewPassEquils = await bcrypt.compare(
      dto.newPassword,
      user.password,
    );

    if (isNewPassEquils) {
      throw new HttpException(
        'Новый пароль не может совпадать со старым',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.newPassword, 3);
    await user.update({ password: hashPassword });

    const userDto = new OutputUserDto(user);
    const tokens = this.tokenService.generateToken(user);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async forgotPass(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    const key = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    await user.update({ switchKey: key });
    await this.mailService.sendSwitchPasswordCodeMail(email, key);

    return;
  }

  async newPass(dto: newPassDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

    if (user.switchKey != dto.code) {
      throw new HttpException('Неверный код', HttpStatus.BAD_REQUEST);
    }

    user.switchKey = null;
    const hashPassword = await bcrypt.hash(dto.newPass, 3);

    await user.update({ password: hashPassword });

    const userDto = new OutputUserDto(user);
    const tokens = this.tokenService.generateToken(user);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(link: string) {
    return this.userService.activate(link);
  }

  async refresh(authorization: string) {
    const decoded = await this.tokenService.getDataFromToken(authorization);

    const user = await this.userService.getUserById(decoded.id);
    if (user.isActivated != decoded.isActivated) {
      decoded.isActivated = user.isActivated;
    }

    return {
      token: authorization.split(' ')[1],
      user: {
        ...new OutputUserDto(decoded),
      },
    };
  }
}
