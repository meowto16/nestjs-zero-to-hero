import { Controller } from '@nestjs/common'

import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAll(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto)
  //   } else {
  //     return this.tasksService.getAllTasks()
  //   }
  // }
  //
  // @Get(':id')
  // getTaskById(@Param('id') id: string): Task {
  //   const found = this.tasksService.getTaskById(id)
  //
  //   if (!found) {
  //     throw new NotFoundException()
  //   }
  //
  //   return found
  // }
  //
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto) {
  //   return this.tasksService.createTask(createTaskDto)
  // }
  //
  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // deleteTaskById(@Param('id') id: string): void {
  //   return this.tasksService.deleteTaskById(id)
  // }
  //
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status)
  // }
}
