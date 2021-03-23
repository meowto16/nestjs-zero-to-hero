import { v1 as uuid } from 'uuid'
import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => id === task.id)
  }

  createTask(createTaskDto: CreateTaskDto): Task  {
    const { title, description } = createTaskDto

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)
    return task
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
    return
  }

  updateTask(updateTaskDto: UpdateTaskDto): Task {
    const { id, ...updateProps } = updateTaskDto
    const idx = this.tasks.findIndex(task => task.id === id)
    if (idx === -1) return null

    const updateCandidate = { ...this.tasks[idx], ...updateProps }

    return this.tasks.splice(idx, 1, updateCandidate) ? updateCandidate : null
  }
}
