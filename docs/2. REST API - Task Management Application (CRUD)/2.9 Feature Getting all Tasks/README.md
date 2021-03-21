# Feature. Получение всех задач

Для начала объявляем приватное поле в сервисе. Назовем его `tasks`. Чуть позже начнем
работать с БД. Пока будем хранить задачи в памяти
```typescript
@Injectable()
export class TasksService {
  private tasks = []
}
```

Затем объявим метод `getAllTasks()` который будет просто неким геттером.
```typescript
@Injectable()
export class TasksService {
  private tasks = []

  getAllTasks() {
    return this.tasks
  }
}
```

После этого добавим обработчик в наш контроллер
```typescript
import { Controller, Get } from '@nestjs/common'

import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} // внедряем сервис

  @Get() // необходимо всегда объявлять метод обработчика, иначе NestJS его не найдет
  getAllTasks() {
    return this.tasksService.getAllTasks() // и затем можем им пользоваться
  }
}
```

### Создаем коллекцию в Postman
![Создаем коллекцию в Postman.png](./img/1.%20Create%20collection%20Postman.png)

### Итог

- Бизнес-логика должна храниться в сервисах
- Контроллеры должны пользоваться методами сервисов
