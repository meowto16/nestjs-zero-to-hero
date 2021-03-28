# Создаем репозиторий для задач

Ранее мы создали сущность `Task`. Мы можем ее использовать в нашем сервисе, что-то вроде 
`createTask`, `findTask` и так далее. Но, это может привести к разрастанию кода.

Поэтому создадим так называемый репозиторий. Необходимо всегда разбивать логику на как можно меньшие части
(если это, конечно, имеет смысл)

Создадим в папке модуля новый файл, назовем его `task.repository.ts`

```typescript
import { EntityRepository, Repository } from 'typeorm'
import { Task } from './task.entity'

@EntityRepository(Task) // Говорим что это репозиторий сущности Task
export class TaskRepository extends Repository<Task> {
  
}
```

Затем добавим наш репозиторий в модуль, с помощью TypeORM модуля
```typescript
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]) // Тут идет перечисление модулей, который мы хотим включить в "экосистему" данного модуля
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
```
