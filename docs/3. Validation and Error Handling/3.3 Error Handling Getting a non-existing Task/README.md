# Обработка ошибок. Получение несуществующей задачи

Просто меняем сервис, если не нашли - бросаем исключение.

```typescript
getTaskById(id: string): Task {
const found = this.tasks.find(task => id === task.id)

if (!found) {
  throw new NotFoundException(`Task with ID (${id}) not found`)
}

return found
}
```
