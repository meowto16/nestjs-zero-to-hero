import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus, NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes, ValidationPipe
} from '@nestjs/common'

import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto)
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    const found = this.tasksService.getTaskById(id)

    if (!found) {
      throw new NotFoundException()
    }

    return found
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
