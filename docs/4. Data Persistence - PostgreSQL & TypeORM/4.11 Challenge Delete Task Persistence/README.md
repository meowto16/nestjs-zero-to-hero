# Challenge. Удаление задачи

## От преподавателя

Надо отрефакторить `Delete` обработчик

Есть два метода в классе `Repository`

- `remove`
- `delete`

Выбираем любой из них. Потом объяснят оба

Также желательно выбрасывать исключение если id не найден.

## Мое решение

Мне очень хотелось написать это вот так, но TypeORM выбрасывает ошибку `EntityNotFoundError`. 
А так как я пока хз как правильно обрабатывать ошибки, которые не относятся к NestJS - сделал по другому.
Нагуглил про Exception Filters, но пока не осмелился применять, потом доберусь думаю
```typescript
async deleteTaskById(id: number): Promise<Task> {
    const entity = await this.taskRepository.findOneOrFail(id)
    return await this.taskRepository.remove(entity)
}
```

Сделал по итогу так сервис. Мне не очень нравится то что дублируется код с проверкой findOne
```typescript
async deleteTaskById(id: number): Promise<Task> {
const entity = await this.taskRepository.findOne(id)

if (!entity) {
  throw new NotFoundException(`Task with ID "${id}" not found`)
}

return await this.taskRepository.remove(entity)
}
```

И так контроллер
```typescript
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.deleteTaskById(id)
}
```
