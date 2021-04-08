# Защищаем Tasks роуты

Сначала добавим AuthModule в `tasks.module.ts`
```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule // Добавляем AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
```

Затем декорируем весь контроллер
```typescript
@Controller('tasks')
@UseGuards(AuthGuard()) // Используем AuthGuard из 
export class TasksController {
  constructor(private tasksService: TasksService) {
  }
}
```
