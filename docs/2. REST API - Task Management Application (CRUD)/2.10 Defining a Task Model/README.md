# Объявление Task модели

Сначала необходимо начать с объявления интерфейса модели

```typescript
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus
}
```

Воспользуемся преимуществами TypeScript'a и объявим enum `TaskStatus`, так как мы хотим, чтобы статус можно было
задать только из этих значений.
```typescript
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}
```

Поставим аннотации в `TasksService`, что теперь свойство `tasks` у нас является массивом из моделей `Task`
```typescript
import { Injectable } from '@nestjs/common';
import { Task } from './task.model'

@Injectable()
export class TasksService {
  private tasks: Task[] = [] // Теперь массив из моделей Task

  // Метод также возвращает массив из моделей Task
  getAllTasks(): Task[] {
    return this.tasks
  }
}
```

Также поставим аннотации в `TasksController` для обработчиков
```typescript
import { Controller, Get } from '@nestjs/common'

import { TasksService } from './tasks.service'
import { Task } from './task.model'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Теперь указано явно, что возвращает массив из моделей Task
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }
}
```

Типы делают наш код более читаемым, предоставляют подсветку для IDE, улучшают дизайн кода,
помогают легче отловить ошибки (при компиляции)
