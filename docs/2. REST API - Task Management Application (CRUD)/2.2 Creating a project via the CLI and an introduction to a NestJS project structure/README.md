# Создание проекта при помощи CLI и введение в структуру проекта

Открываем терминал

`nest new` - Создает новый (стандартный режим) проект
```shell
nest new <project_name>
nest n <project_name>
```

| Опция                        | Описание                                                                                                      |
|------------------------------|---------------------------------------------------------------------------------------------------------------|
| --dry-run, -d                | Говорит об изменениях, которые будут произведены, но не меняет ничего в файловой системе.                     |
| --skip-git, -g               | Пропускает инициализацию гит репозитория                                                                      |
| --skip-install, -s           | Пропускает установку пакетов                                                                                  |
| --package-manager, -p        | Указывает явно пакетный менеджер. Используйте npm или yarn. Пакетнй менеджер должен быть установлен глобально |
| --language, -l               | Указывает явно язык программирования JS или TS                                                                |
| --collection, -c             | Указывает явно структуру проекта (если необходимо использовать свою). Необходимо указать имя npm-пакета       |

Так как мне не нужен git:
```shell
nest n nestjs-task-management -g -p yarn
```

После установки запускаем сервер
```shell
yarn start dev
```

## Немного о файлах

- `tslint.json` - линтер Typescript'a
- `tsconfig.json` - конфигурация TypeScript'a
- `tsconfig.build.json` - Как мы будем билдить приложения для боевого окружения
- `nodemon.json` - конфигурация nodemon'a