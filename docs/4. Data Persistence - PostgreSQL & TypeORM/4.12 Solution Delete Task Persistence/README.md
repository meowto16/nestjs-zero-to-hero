# Решение. Удаление задачи

## Что лучше использовать delete или remove

### delete

В `delete` нужно было бы передавать именно id задачи. Возвращает DeleteResult<T>


### remove

В `remove` нужно передавать entity.


### Так что лучше

Преподаватель бы выбрал `delete` метод, так как он хочет обращаться к БД как можно
меньше (что логично). При использовании `remove` необходимо сначала получить таск, и лишь затем
его удалить. При использовании `delete` - можно посмотреть сколько строк было затронуто и выбросить ошибку если не была
затронута ни одна.

## Решение преподавателя

`tasks.service.ts`
```typescript
async deleteTask(id: number): Promise<void> {
  const result = await this.taskRepository.delete(id)
  
  if (result.affected === 0) { // Лучше указывать явно, а не !result.affected
    throw new NotFoundException(`Task with ID "${id}" not found`)
  }
}
```

`tasks.controller.ts`
```typescript
@Delete('/:id')
deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
  return this.tasksService.deleteTask(id)
}
```
