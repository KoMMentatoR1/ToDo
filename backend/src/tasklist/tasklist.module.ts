import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { TasksListController } from './tasklist.controller';
import { TaskList } from './tasklist.model';
import { TasklistService } from './tasklist.service';

@Module({
  providers: [TasklistService],
  controllers: [TasksListController],
  imports: [SequelizeModule.forFeature([TaskList]), UserModule],
})
export class TasklistModule {}
