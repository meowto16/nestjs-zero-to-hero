# Решение. Обновление задачи

Сначала добавили сервис
```typescript
// Тут похоже он как раз подводит к так называемому
// Active-Record паттерну, где мы просто по очереди задаем
// Свойства объекта и затем вызываем метом .save()
// Еще о чем я не подумал - нужно было просто использовать getTaskById метод,
// а не писать все заново
updateTaskStatus(id: string, status: TaskStatus) {
  const task = this.getTaskById(id)
  task.status = status
  return task
}
```

Затем контроллер
```typescript
@Patch('/:id/status')
updateTaskStatus(
  @Param('id') id: string,
  @Body('status') status: TaskStatus
): Task {
  return this.tasksService.updateTaskStatus(id, status)
}
```

> У преподавателя вышло намного лучше и лаконичнее, особенно сервис, 
> переписал на его вариант
