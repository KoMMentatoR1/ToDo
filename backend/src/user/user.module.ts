import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailModule } from 'src/mail/mail.module';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [MailModule, SequelizeModule.forFeature([User])],
})
export class UserModule {}
