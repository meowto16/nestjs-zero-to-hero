# Создаем сущность "Задача"

В TypeORM мы объявляем сущности, которые представляют таблицы. 

Создадим новый файл `task.entity.ts` в `tasks` модуле
```typescript
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TaskStatus } from './task.model'

@Entity() // Говорим что это сущность
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn() // Говорим что Primary Key
  id: number

  @Column()
  title: string // Я предполагаю тип данных определяется из TypeScript, и для него не нужны декораторы

  @Column()
  description: string

  @Column()
  status: TaskStatus // И этот тип данных похоже тоже
}
```

## Об Entity

https://github.com/typeorm/typeorm/blob/master/docs/entities.md
