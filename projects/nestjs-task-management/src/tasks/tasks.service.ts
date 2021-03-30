import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {

  }

  // getAllTasks() {
  //   return this.tasks
  // }
  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto
  //
  //   let tasks = this.getAllTasks()
  //
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status)
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
  //   }
  //
  //   return tasks
  // }
  //
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    return found
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
  }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id)
  //   task.status = status
  //   return task
  // }
}
