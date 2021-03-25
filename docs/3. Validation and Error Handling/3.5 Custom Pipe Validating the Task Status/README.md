# Кастомный пайп валидации. 

Создаем отдельную директорию `pipes`

Создаем в ней файл `task-status-validation-pipe.ts`

```typescript
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../task.model'

// Должен имплементировать PipeTransform
export class TaskStatusValidationPipe implements PipeTransform {
  // Определим разрешенные статусы
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]
  
  // Так как имплементирует PipeTransform, должен содержать transform метод
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase()

    // Если статус не валиден - выбрасываем исключение
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`)
    }

    // Иначе возвращаем статус как есть
    return value
  }

  // Проверяем является ли статус валидным
  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }
}
```
