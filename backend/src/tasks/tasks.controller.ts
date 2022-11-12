import { Body, Controller, Get, Param, Post, Headers, Delete, Query, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private TaskService: TasksService) {}

  @Post('/add')
  Add(@Body() dto: CreateTaskDto) {
    return this.TaskService.add(dto);
  }

  @Get('/all/:TaskListModelId')
  Get(@Param('TaskListModelId') ListId: number, @Headers("Authorization") authorization: string) {
    return this.TaskService.getByListId(ListId, authorization);
  }

  @Put('/update/:id')
  Update(@Param("id") id: number, @Body() dto: UpdateTaskDto) {
    return this.TaskService.update(id, dto);
  }

  @Delete('/delete/:id')
  Delete(@Param("id") id: number, @Body("taskListId") taskListId: number) {
    return this.TaskService.delete(id, taskListId);
  }
}
