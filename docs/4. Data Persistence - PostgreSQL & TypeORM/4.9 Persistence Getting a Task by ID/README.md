# Сохранение. Получение задачи по ID

1. Инжектим репозиторий
```typescript
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {
    // ...
  }
}
```

2. Создаем асинхронный метод в сервисе, используя репозиторий
```typescript
async getTaskById(id: number): Promise<Task> { // Теперь у нас возвращает Promise<Task>
const found = await this.taskRepository.findOne(id) // Пользуемся методом репозитория

if (!found) {
  throw new NotFoundException(`Task with ID "${id}" not found`) // Если не находим - бросаем ошибку
}

return found
}
```

3. Раскомментируем метод в контроллере и поправим под свои нужды
```typescript
@Get(':id') // ParseIntPipe, используем для парсинга id из урла и преобразования в int
getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> { // Также теперь возвращает Promise<Task>
return this.tasksService.getTaskById(id) // Сократился до одной строки
}
```
