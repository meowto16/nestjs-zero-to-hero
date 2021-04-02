# Сохранение. Получение задач (с фильтрами или без)

Автор знакомит с таким понятием как `QueryBuilder` в NestJS. Как я понял, это довольно
удобный билдер SQL запросов, чтобы не писать их руками.

Создадим новый метод в репозитории `tasks.repository.ts`
```typescript
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
  const { status, search } = filterDto
  const query = this.createQueryBuilder('task') // насчет алиаса не совсем понял, видимо он сущность забирает, надо почитать

  // andWhere используется, чтобы не перетереть другое where. Они добавляются друг за другом
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

Таким образом мы перенесли логику селекта задач в репозиторий.


## [Документация по QueryBuilder](https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md)
