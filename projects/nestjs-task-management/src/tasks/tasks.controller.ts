import {
  Body,
  Controller, Delete,
  Get, HttpCode, HttpStatus,
  Param,
  ParseIntPipe, Patch,
  Post, Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { TasksService } from './tasks.service'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto)
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
