# Подсоединяем NestJS к БД используя TypeORM

Для начала поставим зависимости
`yarn add @nestjs/typeorm typeorm pg`

Теперь нам необходимо инициализировать соединение в приложении

Есть несколько вариантов

- статичный JSON файл
- передача данных в качестве объекта (выбираем этот путь)
- передача данных асинхронно из сервиса

Создадим новую директорию, назовем `config`

В нем создадим файл конфигурации `typeorm.config.ts`
```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
}
```

Затем в корневой модуль подключим `TypeOrmModule`
```typescript
import { Module } from '@nestjs/common'
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // подключаем БД
    TasksModule
  ]
})
export class AppModule {
}
```

По итогу не должны видеть никаких ошибок в консоли при `yarn start:dev`. Если их нет — то ок.
(Не забываем создать БД `taskmanagement` в Postgres)
