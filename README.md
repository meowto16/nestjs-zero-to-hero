# NestJS Zero to Hero - Modern Typescript Back-end development

## О курсе
- Udemy: https://www.udemy.com/course/nestjs-zero-to-hero/
- Author: Ariel Weinberger

## О чем курс

- Познакомитесь с NestJS фреймворком и его составляющими
- Разработаете REST APIs, выполняющие CRUD операции
- Аутентификация и авторизация для back-end приложений
- Использование TypeORM для взаимодействия с БД
- Лучшие практики безопасности, хэширование пароля, хранение конфиденциальной информации
- Сохранение данных используя БД
- Деплой back-end приложения на Amazom Web Services
- Написание чистого, поддерживаемого кода в соответствии с текущими стандартами
- Использование NestJS CLI
- Использование Postman для тестирования back-end сервисов
- Использование pgAdmin для управления PostgreSQL БД
- Внедрение эффективного логирования в back-end приложение
- Управление переменными и конфигурацией окружения
- Внедрение валидации данных, использование пайпов
- Защита эндпоинтов для авторизованных пользователей используя Guards
- Моделирование сущностей для слоя persist'а
- Лучшие практики Typescript
- Обработка асинронных операций используя async-await
- Использование DTO (Data Transfer Objects)
- Практический опыт использования JSON Web токенов (JWT)
- Unit-тестирование NestJS приложений
- Использование GraphQL с NestJS
- Persist БД используя MongoDB

## Навигация

- [1 Введение в NestJS и предварительная подготовка](./docs/1.%20Introduction%20to%20NestJS%20&%20Pre-requisites)
  - [1.1 Добро пожаловать на курс!](./docs/1.%20Introduction%20to%20NestJS%20&%20Pre-requisites/1.1%20Welcome%20to%20the%20course!)
  - [1.2 Что такое NestJS?](./docs/1.%20Introduction%20to%20NestJS%20&%20Pre-requisites/1.2%20What%20is%20NestJS%3F)
  - [1.3 Установка NodeJS и NPM](./docs/1.%20Introduction%20to%20NestJS%20&%20Pre-requisites/1.3%20Installing%20Node.js%20and%20NPM)
  - [1.4 Установка NestJS CLI](./docs/1.%20Introduction%20to%20NestJS%20&%20Pre-requisites/1.4%20Installing%20the%20NestJS%20CLI)
  - [1.5 Установка Postman](./docs/1.%20Introduction%20to%20NestJS%20&%20Pre-requisites/1.4%20Installing%20the%20NestJS%20CLI)
- [2 REST API - TODO приложение (CRUD)](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD))
  - [2.1 Обзор проекта TODO приложения](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.1%20Project%20Overview%20Task%20Management%20Application)
  - [2.2 Создание проекта используя CLI и введение в структуру проекта](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.2%20Creating%20a%20project%20via%20the%20CLI%20and%20an%20introduction%20to%20a%20NestJS%20project%20structure)
  - [2.3 Введение в NestJS модули](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.3%20Introduction%20to%20NestJS%20Modules)
  - [2.4 Создание Tasks модуля](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.4%20Creating%20a%20Tasks%20Module)
  - [2.5 Введение в контроллеры NestJS](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.5%20Introduction%20to%20NestJS%20Controllers)
  - [2.6 Создание Tasks контроллера](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.6%20Creating%20a%20Tasks%20Controller)
  - [2.7 Введение в NestJS провайдеры и сервисы](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.7%20Introduction%20to%20NestJS%20Providers%20and%20Services)
  - [2.8 Создание Tasks сервиса](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.8%20Creating%20a%20Tasks%20Service)
  - [2.9 Получение всех задач](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.9%20Feature%20Getting%20all%20Tasks)
  - [2.10 Объявление Task модели](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.10%20Defining%20a%20Task%20Model)
  - [2.11 Feature. Создание задачи (часть 1, сервис)](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.11%20Feature%20Creating%20a%20Task%20(Part%201%20Service))
  - [2.12 Feature. Создание задачи (часть 2, контроллер)](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.12%20Feature%20Creating%20a%20Task%20(Part%202%20Controller))
  - [2.13 Введение в DTO (Data Transfer Objects)](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.13%20Introduction%20to%20Data%20Transfer%20Objects%20(DTOs))
  - [2.14 Создаём CreateTaskDTO](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.14%20Creating%20a%20CreateTaskDto)
  - [2.15 Feature. Получение задачи по ID](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.15%20Feature%20Getting%20a%20Task%20by%20ID)
  - [2.16 Challenge. Удаление задачи по ID](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.16%20Challenge%20Deleting%20a%20Task)
  - [2.17 Решение. Удаление задачи](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.17%20Solution%20Deleting%20a%20Task)
  - [2.18 Challenge. Обновление задачи](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.18%20Challenge%20Updating%20a%20Task's%20Status)
  - [2.19 Решение. Обновление задачи](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.19%20Solution%20Updating%20a%20Task's%20Status)
  - [2.20 Feature. Фильтрация и поиск задач](./docs/2.%20REST%20API%20-%20Task%20Management%20Application%20(CRUD)/2.20%20Feature%20Searching%20and%20Filtering%20Tasks)
- [3 Валидация и обработка ошибок](./docs/3.%20Validation%20and%20Error%20Handling)
  - [3.1 Введение в NestJS пайпы](./docs/3.%20Validation%20and%20Error%20Handling/3.1%20Introduction%20to%20NestJS%20Pipes)
  - [3.2 Пайп валидации. Создание задачи](./docs/3.%20Validation%20and%20Error%20Handling/3.2%20ValidationPipe%20Creating%20a%20Task)
  - [3.3 Обработка ошибок. Получение несуществующей задачи](./docs/3.%20Validation%20and%20Error%20Handling/3.3%20Error%20Handling%20Getting%20a%20non-existing%20Task)
  - [3.4 Обработка ошибок. Удаление несуществующей задачи](./docs/3.%20Validation%20and%20Error%20Handling/3.4%20Error%20Handling%20Deleting%20a%20non-existing%20Task)
  - [3.5 Кастомный пайп валидации](./docs/3.%20Validation%20and%20Error%20Handling/3.5%20Custom%20Pipe%20Validating%20the%20Task%20Status)
  - [3.6 Пайп валидации для фильтрации и поиска задач](./docs/3.%20Validation%20and%20Error%20Handling/3.6%20ValidationPipe%20Task%20Filtering%20and%20Search)
- [4 Сохранение данных - PostgreSQL и TypeORM](./docs/4.%20Data%20Persistence%20-%20PostgreSQL%20&%20TypeORM)
  - [4.1 Установка PostgreSQL и pgAdmin](./docs/4.%20Data%20Persistence%20-%20PostgreSQL%20&%20TypeORM/4.1%20Installing%20PostgreSQL%20and%20pgAdmin)
