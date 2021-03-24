# Обработка ошибок. Удаление несуществующей задачи

Просто используем ранее определенный метод `this.getTaskById(id)`, который выбрасывает
исключение, если не найдет элемента с таким id. Все.
```typescript
deleteTaskById(id: string): void {
const found = this.getTaskById(id)
this.tasks = this.tasks.filter(task => task.id !== found.id)
}
```
