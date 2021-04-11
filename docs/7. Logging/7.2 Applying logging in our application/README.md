# Внедрение логирования в наше приложение

NestJS имеет встроенный логгер. Также полезно знать, что можно подключить другой логгер, если необходимо.

Объявляем логгер как приватную переменную там, где это необходимо:
```typescript
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository')
  // ...
}
```

Далее просто пользуемся методами:

- `this.logger.error`
- `this.logger.verbose`
- `this.logger.debug`
- `this.logger.warning`
