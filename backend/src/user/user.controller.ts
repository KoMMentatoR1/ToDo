import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get('/activ/:value')
  activation(@Param('value') value: string) {
    return this.UserService.activate(value);
  }
}
