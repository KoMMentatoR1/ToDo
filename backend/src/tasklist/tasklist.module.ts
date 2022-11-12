import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { TasksListController } from './tasklist.controller';
import { TaskList } from '../models/tasklist.model';
import { TasklistService } from './tasklist.service';
import { TokenModule } from 'src/token/token.module';
import { User } from 'src/models/user.model';

@Module({
  providers: [TasklistService],
  controllers: [TasksListController],
  imports: [SequelizeModule.forFeature([TaskList, User]), UserModule, TokenModule],
})
export class TasklistModule {}
