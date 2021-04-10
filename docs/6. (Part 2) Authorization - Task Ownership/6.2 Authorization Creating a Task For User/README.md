# Авторизация. Создаем задачу для юзера

Модифицируем метод `createTask` в контроллере, чтобы он передавал в сервис юзера.
Используем наш кастомный декоратор `GetUser()`
```typescript
@Post()
@UsePipes(ValidationPipe)
createTask(
@Body() createTaskDto: CreateTaskDto,
@GetUser() user: User // Теперь передаем юзера
): Promise<Task> {
return this.tasksService.createTask(createTaskDto, user) // Пробрасываем юзера в метод сервиса
}
```

Далее модифицируем сервис, также добавим в аргументы юзера
```typescript
  async createTask(
    createTaskDto: CreateTaskDto,
    user: User // Теперь передаем юзера
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user) // Пробрасываем юзера в метод репозитория
  }
```

И модифицируем метод репозитория
```typescript
  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto

    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    task.user = user // Задаем юзера для задачи
    await task.save()

    delete task.user
    return task
  }
```
