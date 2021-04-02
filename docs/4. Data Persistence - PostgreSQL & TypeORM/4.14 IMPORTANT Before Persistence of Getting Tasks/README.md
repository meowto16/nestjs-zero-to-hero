# ВАЖНО. Перед сохранением получения задач

Логичнее в контроллере иметь вместо двух сервисов - один.
Могут возникнуть проблемы, когда появится больше условий, вроде пользователей, ролей и т.д.

В сервисе:
```typescript
getTasks(filterDto: GetTasksFilterDto) {
  // .. Оставляем пустым до следующего урока
}
```

В контроллере:
```typescript
@Get()
getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
  return this.tasksService.getTasks(filterDto)
}
```
