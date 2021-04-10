# Авторизация. Удаление задачи пользователя

Также как и в прошлых уроках пробрасываем юзера в сервис
```typescript
@Patch('/:id/status')
updateTaskStatus(
@Param('id', ParseIntPipe) id: number,
@Body('status', TaskStatusValidationPipe) status: TaskStatus,
@GetUser() user: User
): Promise<Task> {
return this.tasksService.updateTaskStatus(id, status, user)
}
```

Далее в сервисе ищем по userId. Обращаем внимание, что тут `where` не нужен, так как id уникальный.
```typescript
async deleteTaskById(id: number, user: User): Promise<void> {
const result = await this.taskRepository.delete({ id, userId: user.id })

if (result.affected === 0) {
  throw new NotFoundException(`Task with ID "${id}" not found`)
}
}
```

Как итог: удаляется лишь задача, принадлежащая пользователю
