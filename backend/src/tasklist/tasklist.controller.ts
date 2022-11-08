import { Body, Controller, Post } from '@nestjs/common';
import { DeleteTaskListDto } from './DeleteTaskList.dto';
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

  @Post('/get')
  Get(@Body('userId') id: number) {
    return this.TaskListService.getByUserId(id);
  }

  @Post('/update')
  Update(@Body() dto: UpdateTaskListDto) {
    return this.TaskListService.updateList(dto);
  }

  @Post('/delete')
  Delete(@Body() dto: DeleteTaskListDto) {
    return this.TaskListService.deleteList(dto);
  }
}
