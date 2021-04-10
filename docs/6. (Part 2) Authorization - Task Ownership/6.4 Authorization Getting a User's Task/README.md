# Авторизация. Получение задачи пользователя по ID

Пробрасываем через контроллер в сервис юзера
```typescript
@Get(':id')
getTaskById(
@Param('id', ParseIntPipe) id: number,
@GetUser() user: User
): Promise<Task> {
return this.tasksService.getTaskById(id, user) // Пробрасываем юзера
}
```

```typescript
async getTaskById(
id: number,
user: User
): Promise<Task> {
  // Ранее мы искали просто по id, findOne(id). Теперь задаем объект с параметрами, где указываем
  where
const found = await this.taskRepository.findOne({
    where: {
      id, // id задачи
      userId: user.id // id-шник пользователя
    }
  }
)
```

Как итог: если юзеру задача не принадлежит - получаем 404. Если принадлежит - получаем задачу.

Заметка: автор упомянул, что 404 более лучший вариант, чем 403, так как это приватная информация,
и мы не хотим раскрывать ее посторонним лицам. Соответственно правильнее будет отдавать как можно
меньше информации пользователю, который не имеет на эту задачу прав.
