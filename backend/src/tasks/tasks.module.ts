import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskList } from 'src/models/tasklist.model';
import { TokenModule } from 'src/token/token.module';
import { Task } from '../models/task.model';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [SequelizeModule.forFeature([Task, TaskList]), TokenModule],
})
export class TasksModule {}
