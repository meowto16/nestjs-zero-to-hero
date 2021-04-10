# Авторизация. Получение задач для юзера

Также как и в прошлом уроке, модифицируем контроллер и сервис, пробрасываем везде юзера.
```typescript
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User // Добавляем в аргументы юзера
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user) // Пробрасываем юзера в метод
  }
```

```typescript
  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User // Добавляем в аргументы юзера
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user) // Пробрасываем юзера в метод
  }
```

Затем модифицируем метод репозитория `getTasks`
```typescript
  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')

    query.where('task.userId = :userId', { userId: user.id }) // Получаем задачи юзера

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    const tasks = await query.getMany()
    return tasks
  }
```

Как итог: теперь получаем задачи только для текущего пользователя
