# Пайп валидации для фильтрации и поиска задач

Достаточно добавить нужные декораторы в самом классе

```typescript
import { TaskStatus } from '../task.model'
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'

export class GetTasksFilterDto {
  @IsOptional() // Необязательный параметр
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]) // Проверка есть ли значение в массиве
  status: TaskStatus

  @IsOptional()
  @IsNotEmpty() // Не пустой
  search: string
}
```

Затем добавляем `ValidationPipe` внутрь `Query()` в нашем обработчике. И все

```typescript
@Get()
getAll(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
if (Object.keys(filterDto).length) {
  return this.tasksService.getTasksWithFilters(filterDto)
} else {
  return this.tasksService.getAllTasks()
}
}
```
