# Пайп валидации. Создание задачи

Сейчас у нас есть проблема, при создании задачи можно отправить пустой `title` и `description`, а
задача все равно создастся.

Поставим два пакета
`yarn add class-validator class-transformer`

Все валидаторы, декораторы:
https://github.com/typestack/class-validator#validation-decorators

Для DTO прописываем декораторы
```typescript
import { IsNotEmpty } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}
```

И для в контроллере для обработчика `UsePipes()`
```typescript
@Post()
@UsePipes(ValidationPipe)
createTask(@Body() createTaskDto: CreateTaskDto) {
return this.tasksService.createTask(createTaskDto)
}
```
