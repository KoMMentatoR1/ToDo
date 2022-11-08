import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { DeleteTaskDto } from './dto/DeleteTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private TaskService: TasksService) {}

  @Post('/add')
  Add(@Body() dto: CreateTaskDto) {
    return this.TaskService.add(dto);
  }

  @Post('/get')
  Get(@Body('TaskListId') ListId: number) {
    return this.TaskService.getByListId(ListId);
  }

  @Post('/update')
  Update(@Body() dto: UpdateTaskDto) {
    return this.TaskService.update(dto);
  }

  @Post('/delete')
  Delete(@Body() dto: DeleteTaskDto) {
    return this.TaskService.delete(dto);
  }
}
