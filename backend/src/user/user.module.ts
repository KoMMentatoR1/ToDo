import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailModule } from 'src/mail/mail.module';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [MailModule, SequelizeModule.forFeature([User])],
})
export class UserModule {}
