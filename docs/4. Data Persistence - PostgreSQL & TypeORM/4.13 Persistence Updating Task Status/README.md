# Сохранение. Обновление статуса задачи

Объявляем новый метод в сервисе

```typescript
async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
  const task = await this.getTaskById(id)
  task.status = status
  await task.save()
  return task
}
```

Затем дорабатываем контроллер
```typescript
@Patch('/:id/status')
updateTaskStatus(
  @Param('id', ParseIntPipe) id: number,
  @Body('status', TaskStatusValidationPipe) status: TaskStatus
): Promise<Task> {
  return this.tasksService.updateTaskStatus(id, status)
}
```
