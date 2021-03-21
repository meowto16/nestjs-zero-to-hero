# Создаем CreateTaskDTO

Создадим новую папку в нашем модуле `tasks`, назовем её `dto`.

Далее создадим там файл, назовем его `create-task.dto.ts`

Объявим наш `CreateTaskDto`
```typescript
export class CreateTaskDto {
  title: string
  description: string
}
```

Далее нам необходимо поправить контроллер и сервис
```typescript
import { Body, Controller, Get, Post } from '@nestjs/common'

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

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) { // Меняем на createTaskDto
    return this.tasksService.createTask(createTaskDto) // И просто создаем таск из DTO
  }
}
```

Перепишем сервис также
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

  createTask(createTaskDto: CreateTaskDto): Task  { // в аргументы теперь приходит только DTO
    const { title, description } = createTaskDto // Деструктуризируем

    const task: Task = {
      id: uuid(),
      title, // Остальное остается также
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)
    return task
  }
}
```
