# Введение в DTO (Data Transfer Objects)

## Понимание проблемы

Сейчас наша архитектура выглядит так
![До DTO](./img/1.%20Before%20DTO.png)

### В чем заключается проблема:

- Мы можем изменить типы параметров
- Можем добавить новый аргумент или убрать какой-либо из них
- Проблема будет усугубляться, когда мы будем добавлять новый функционал 
  (валидацию, трансформацию данных, новый сервис, который тоже что-то будет делать с этими данными)

И если нам придется это делать, то несложно догадаться, посмотрев на картинку,
что нам придется прописывать типы, параметры в нескольких местах **(выделено красным)**

По итогу код станет слегка неряшливым, без использования **DTO**, ведь у нас нет унифицированного стандарта как должны
выглядеть данные

> DTO (Data Transfer Object) - это объект, который переносит данные между процессами
> 
> *© "Data Transfer Object", Wikipedia*

> DTO (Data Transfer Object) - это объект, который используется для инкапсуляции данных, и отправки их
> из одной подсистемы приложения в другую
> 
> *© "What is a Data Transfer Object", StackOverflow*

> DTO (Data Transfer Object) - это объект, который определяет как дата, будет пересылаться
> по сети (схеме, цепи)
> 
> *© NestJS документация*

## Чуть больше о DTOs

- Общий концепт в разработке ПО, который не является уникальным для NestJS
- Приводит к пуленепробиваемому коду, так как может использоваться с типами TypeScript
- Не имеет никакого поведения, кроме хранения, получения, сериализации и десериализации собственных данных
- Приводит к повышенной производительности (несмотря на то что лишь к незначительной в маленьких приложениях)
- Полезно при валидации данных
- **Очень важно понимать**, что **DTO - это не объявление модели**. Это определяет вид данных для конкретного случая,
например — для создания задачи.
- Могут быть объявлены используя `interface` или `class`

## Classes VS Interfaces для DTO

DTO (Data Transfer Objects) могут быть объявлены с помощью классов или интерфейсов.

Рекомендуется использовать **классы**, что четко задокументировано в NestJS документации.

Причина заключается в том, что интерфейсы являются частью TypeScript, поэтому не сохраняются после компиляции

Классы позволяют нам больше, так как они являются частью JavaScript, они будут сохранены после компиляции.

NestJS не может ссылаться на интерфейсы в run-time, но может ссылаться на классы

> **Резюмируем:** Используй **классы** при объявлении DTO

## Примеры DTOs

![2. Примеры DTO](./img/2.%20DTO%20Examples.png)

Данные DTO могут использоваться в различных местах нашего приложения, вроде пайпов, валидации, сервисов, контроллерах.

## Важное примечание

DTO **НЕ** является обязательным.

Вы все еще можете разрабатывать приложения, не используя DTO.

Тем не менее, ценность которую они дают, делают целесообразным их использование, когда это применимо.

Применение DTO паттерна как можно раньше сделает для вас поддержку и рефактор вашего кода проще. 