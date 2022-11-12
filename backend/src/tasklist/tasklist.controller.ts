import { Body, Controller, Get, Param, Post, Put, Headers } from '@nestjs/common';
import { DeleteTaskListDto } from './dto/DeleteTaskList.dto';
import { CreateTaskListDto } from './dto/CreateTastList.dto';
import { UpdateTaskListDto } from './dto/UpdateTaskList.dto';
import { TasklistService } from './tasklist.service';

@Controller('tasklist')
export class TasksListController {
  constructor(private TaskListService: TasklistService) {}

  @Post('/add')
  Add(@Body() dto: CreateTaskListDto) {
    return this.TaskListService.Create(dto);
  }

  @Get('/get/:id')
  Get(@Param("id") id:number, @Headers("Authorization") authorization: string) {
    return this.TaskListService.getByUserId(id, authorization);
  }

  @Put('/update/:id')
  Update(@Param("id") id: number, @Body() dto: UpdateTaskListDto) {
    return this.TaskListService.updateList(id, dto);
  }

  @Post('/delete')
  Delete(@Body() dto: DeleteTaskListDto) {
    return this.TaskListService.deleteList(dto);
  }
}
