# Авторизация. Обновление статуса задачи пользователя

Как и в прошлых уроках, модифицируем контроллер, добавляем аргумент юзер, декорированный кастомным декоратором `GetUser()`
```typescript
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User // Забираем юзера из токена
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user) // Пробрасываем юзера в метод сервиса
  }
```

```typescript
async updateTaskStatus(
id: number,
status: TaskStatus,
user: User
): Promise<Task> {
const task = await this.getTaskById(id, user) // Так как мы пользуемся методом репозитория, 
// где логика уже инкапсулирована, просто добавляем юзера в аргументы
task.status = status
await task.save()
return task
}
```
