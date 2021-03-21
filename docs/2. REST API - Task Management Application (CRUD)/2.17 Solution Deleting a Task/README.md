# Решение. Удаление задачи

Решение абсолютно такое же, за исключением двух моментов

1) Преподаватель пишет URL'ы через слэш
```typescript
@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
deleteTaskById(@Param('id') id: string): void {
return this.tasksService.deleteTaskById(id)
}
```
2) Не использовал HttpCode (думаю объяснит потом)

В остальном все тоже самое, везде возвращает также `void`
