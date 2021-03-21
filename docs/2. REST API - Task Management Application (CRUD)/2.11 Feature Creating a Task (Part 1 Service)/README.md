# Feature. Создание задачи (часть 1, сервис)

```typescript
import { v1 as uuid } from 'uuid'
import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }

  createTask(title: string, description: string): Task  {
    const task: Task = {
      id: uuid(),
      title, // Также обсуждался такой синтаксис, то что это фича ES6
      description, // и если кто не знает, соответствует записи вида decription: description
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)
    return task // Считается хорошей практикой возвращать созданный элемент
  }
}
```

Для того чтобы создать id, добавим новый пакет uuid
```shell
yarn add uuid
```
