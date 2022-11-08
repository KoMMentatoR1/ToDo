import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { AuthService } from './auth.service';
import { newPassDto } from './dto/newPass.dto';
import { SwitchPassDto } from './dto/switchPass.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  Registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @Post('/login')
  Login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post('/switchPassword')
  SwitchPass(@Body() dto: SwitchPassDto) {
    return this.authService.switchPass(dto);
  }

  @Post('/forgotPassowrd')
  ForgotPass(@Body() email: string) {
    return this.authService.forgotPass(email);
  }

  @Post('/newPass')
  NewPass(@Body() dto: newPassDto) {
    return this.authService.newPass(dto);
  }
}
