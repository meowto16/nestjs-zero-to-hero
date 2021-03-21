# Feature. Создание задачи (часть 2, контроллер)

Объявим новый `POST` метод `createTask`
```typescript
import { Body, Controller, Get, Post } from '@nestjs/common'

import { TasksService } from './tasks.service'
import { Task } from './task.model'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }

  // Достанет все параметры и положит в аргумент body
  // @Post()
  // createTask(@Body() body) {
  //   console.log(body)
  // }
  
  // Вытащит отдельные значения из body
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    return this.tasksService.createTask(title, description)
  }
}
```

### Пример запроса в Postman
![1. Пример запроса в Postman](./img/1.%20Request%20example%20in%20Postman.png)
