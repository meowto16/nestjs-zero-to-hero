# Feature. Поиск и фильтрация задач

Добавим новую фичу, по для поиска задач по `title` или `description`

Сначала создадим новый DTO
```typescript
import { TaskStatus } from '../task.model'

export class GetTasksFilterDto {
  status: TaskStatus
  search: string
}
```

Переименуем обработчик
```typescript
// Был getAllTasks
@Get()
getAll(@Query() filterDto: GetTasksFilterDto): Task[] {
  return this.tasksService.getAllTasks()
}
```

Создадим еще один метод в сервисе
```typescript
getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
const { status, search } = filterDto

let tasks = this.getAllTasks()

if (status) {
  tasks = tasks.filter(task => task.status === status)
}

if (search) {
  tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
}

return tasks
}
```

Дописываем контроллер, выбираем разные сервисы в зависимости от query параметра
```typescript
@Get()
getAll(@Query() filterDto: GetTasksFilterDto): Task[] {
if (Object.keys(filterDto).length) {
  return this.tasksService.getTasksWithFilters(filterDto)
} else {
  return this.tasksService.getAllTasks()
}
}
```
