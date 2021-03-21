# Введение в NestJS провайдеры и сервисы

## Провайдеры (Providers)

- Могут быть введены в конструктор, если декорированы при помощи `@Injectable`, 
  через *внедрение зависимостей (dependency injection)*
- Могут быть простым значением, классом, sync/async фабрикой и так далее
- Провайдеры должны быть предоставлены модулю для использования (читай записаны в модуле)
- Могут быть экспортированы из модуля - и затем доступны другим модулям, которые импортируют их.

## Сервисы (Services)

- Объявляются как провайдеры. **Не все провайдеры являются сервисами**
- Общий концепт в пределах разработки ПО и не является чем-то уникальным в NestJS, JavaScript или 
back-end разработке
- Является синглтоном когда, оборачивается декоратором `@Injectable()` и предоставляется модулю.
  Это означает, что один и тот же инстанс может быть общим для всего приложения — 
  играя роль единственного источника правды.
- Является основным ресурсом, содержащим бизнес логику. Например: Сервис будет вызван из контроллера для валидации
данных, создания элемента в базе данных и возврата ответа.
  
### Пример коммуникации сервисов с контроллером (изображение)

![Пример коммуникации сервисов с контроллером](./img/1.%20Services%20communication%20with%20controller.png)

### Пример коммуникации сервисов с контроллером (код)

```typescript
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { LoggerService } from '../shared/logger.service'

@Module({
  controllers: [
    TasksController
  ],
  providers: [
    TasksService,
    LoggerService
  ]
})
export class TasksModule {}
```

## Внедрение зависимостей (dependency injection) в NestJS

Любой компонент внутри NestJS экосистемы может внедрять провайдеры, декорированные при помощи 
`@Injectable`

Мы объявляем зависимости внутри конструктора класса. NestJS позаботится о внедрении за нас, и данная
зависимость будет доступна как свойство класса.

Пример:

```typescript
import { TasksService } from './tasks.service'

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  
  @Get()
  async getAllTasks() {
    return await this.tasksService.getAllTasks()
  }
}
```
