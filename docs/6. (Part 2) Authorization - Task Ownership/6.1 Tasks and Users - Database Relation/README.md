# Задачи и пользователи - БД реляции

Теперь нам нужно объявить отношение между юзерами и тасками. One to many.

Сначала отредактируем `user.entity.ts`

```typescript
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Task } from '../tasks/task.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  salt: string

  // Пока не совсем понятно для меня как это работает.
  // Я так понял второй аргумент - это как мы будем обращаться к юзеру через таску
  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}
```

`eager` - когда бы мы не вызвали сущность юзера, мы можем использовать
`user.tasks` и получить доступ к коллекции.

Затем отредактируем `task.entity.ts`
```typescript
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskStatus } from './task-status.enum'
import { User } from '../auth/user.entity'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User
}
```

## О Many to one/One to many в TypeORM

- https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md
- https://www.bookstack.cn/read/TypeORM/spilt.22.spilt.3.README.md
