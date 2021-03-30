# Сохранение. Создание задачи

Разберем два способа создания создачи:
- [Через репозиторий](#---by-repository)
- [Через сущность](#---by-entity)

## Создание через сущность {#by-entity}

```typescript
async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  const { title, description } = createTaskDto
  // Довольно много логики для сервиса
  // Мы можем вынести эту логику в репозиторий
  const task = new Task()
  task.title = title
  task.description = description
  task.status = TaskStatus.OPEN
  await task.save()

  return task
}
```

## Создание через репозиторий {#by-repository}

Просто выносим эту логику в репозиторий
```typescript
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto

    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    await task.save()

    return task
  }
}
```

В сервисе используем 
```typescript
async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  return this.taskRepository.createTask(createTaskDto)
}
```

Честно говоря я не догнал пока "преимуществ" репозитория из этого урока. Просто логику унесли в другое место.
