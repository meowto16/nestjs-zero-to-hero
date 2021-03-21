# Feature. Получение задачи по ID

Создадим новый метод `getTaskById` в сервисе

```typescript
import { v1 as uuid } from 'uuid'
import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }

  // Создаем новый метод
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
}
```

Затем создаем новый обработчик в контроллере
```typescript
import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { TasksService } from './tasks.service'
import { Task } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }

  // Получаем id из URL'а
  // Затем передаем в метод сервиса
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto)
  }
}
```

### Затем создадим новый запрос в Postman
![1. Создаем новый запрос в Postman](./img/1.%20Create%20new%20request%20in%20Postman.png)
