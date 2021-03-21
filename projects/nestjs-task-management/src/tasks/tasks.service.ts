import { v1 as uuid } from 'uuid'
import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }

  createTask(title: string, description: string): Task  {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)
    return task
  }
}
