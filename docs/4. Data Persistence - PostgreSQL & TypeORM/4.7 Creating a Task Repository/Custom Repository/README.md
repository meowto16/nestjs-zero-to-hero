# [Кастомные репозитории](https://github.com/typeorm/typeorm/blob/master/docs/custom-repository.md)

Вы можете создавать кастомный репозитории, которые должны содержать методы для работы с БД.
Обычно кастомные репозитории создаются для единственной сущности и содержат ее специфичные запросы.
Например, допустим мы хотим метод, называющийся `findByName(firstName: string, lastName: string)`
который будет искать пользователей по заданному имени и фамилии.

Лучшее место для этого метода - репозиторий, таким образом мы сможем его вызывать вроде
`userRepository.findByName(...)`.

Есть несколько способов создания репозитория

* [Custom repository extends standard Repository](#custom-repository-extends-standard-repository)
* [Custom repository extends standard AbstractRepository](#custom-repository-extends-standard-abstractrepository)
* [Custom repository without extends](#custom-repository-without-extends)
* [Using custom repositories in transactions](#using-custom-repositories-in-transactions-or-why-custom-repositories-cannot-be-services)

* [Custom repository extends standard Repository](#custom-repository-extends-standard-repository)
* [Custom repository extends standard AbstractRepository](#custom-repository-extends-standard-abstractrepository)
* [Custom repository without extends](#custom-repository-without-extends)
* [Using custom repositories in transactions](#using-custom-repositories-in-transactions-or-why-custom-repositories-cannot-be-services)

## Custom repository extends standard Repository

Первый путь - это наследоваться от `Repository`

Пример:
```typescript
import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByName(firstName: string, lastName: string) {
        return this.findOne({ firstName, lastName });
    }

}
```

Затем можно его использовать вроде:
```typescript
import {getCustomRepository} from "typeorm";
import {UserRepository} from "./repository/UserRepository";

const userRepository = getCustomRepository(UserRepository); // or connection.getCustomRepository or manager.getCustomRepository()
const user = userRepository.create(); // same as const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
await userRepository.save(user);

const timber = await userRepository.findByName("Timber", "Saw");
```

Как можно видеть выше, "получение" репозитория осуществляется с помощью `getCustomRepositoryz`, и вы можете обращаться
к любому методу внутре него и любой метод будет стандартной сущностью репозитория.

## Custom repository extends standard AbstractRepository

Второй путь, это наследования от абстрактного класса `AbstractRepository`:

```typescript
import {EntityRepository, AbstractRepository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

    createAndSave(firstName: string, lastName: string) {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        return this.manager.save(user);
    }

    findByName(firstName: string, lastName: string) {
        return this.repository.findOne({ firstName, lastName });
    }

}
```

Затем можно использовать его так

```typescript
import {getCustomRepository} from "typeorm";
import {UserRepository} from "./repository/UserRepository";

const userRepository = getCustomRepository(UserRepository); // or connection.getCustomRepository or manager.getCustomRepository()
await userRepository.createAndSave("Timber", "Saw");
const timber = await userRepository.findByName("Timber", "Saw");
```

Разница между этим типом репозитория и предыдущим заключается в том, что он не раскрывает все методы, который имеет `Repository`.
`AbstractRepository` не имеет никаких публичных методов, у него есть только protected методы, вроде `manager` и `repository`, которые
вы можете использовать в своих публичных методах.

Наследование от `AbstractRepository` полезно, если вы не хотите раскрывать все методы, который стандартный `Repository` имеет (публичные методы).

## Custom repository without extends

Третий вариант - это создание репозиторий без наследования чего-либо, но при объявлении конструктора необходимо
всегда указывать в аргументы `EntityManager`

```typescript
import {EntityRepository, Repository, EntityManager} from "typeorm";
import {User} from "../entity/User";

@EntityRepository()
export class UserRepository {

    constructor(private manager: EntityManager) {
    }

    createAndSave(firstName: string, lastName: string) {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        return this.manager.save(user);
    }

    findByName(firstName: string, lastName: string) {
        return this.manager.findOne(User, { firstName, lastName });
    }

}
```

Затем можно использовать его так.

```typescript
import {getCustomRepository} from "typeorm";
import {UserRepository} from "./repository/UserRepository";

const userRepository = getCustomRepository(UserRepository); // or connection.getCustomRepository or manager.getCustomRepository()
await userRepository.createAndSave("Timber", "Saw");
const timber = await userRepository.findByName("Timber", "Saw");
```

Этот тип репозитория ни от чего не наследуется - вам необходимо лишь объявить в конструкторе `EntityManager`.
Затем вы можете использовать его везде, где необходимо в методах репозитория. Также такой тип репозитория не ограничивается
лишь одной какой-то сущностью, вы можете управлять несколькими сущностями внутри него.

## Using custom repositories in transactions or why custom repositories cannot be services

Кастомные репозитории не могут быть сервисами, потому что у них нет одного единственного инстанса кастомного репозитория
(вроде постоянных репозиториев или Entity Manager) в приложении.

Помимо этого,
Besides the fact that there can be multiple connections in your app (where entity manager and repositories are different)
repositories and managers are different in transactions as well.
For example:

```typescript
await connection.transaction(async manager => {
    // в транзакциях вы ДОЛЖНЫ использовать инстанс менеджера, предоставленный транзакцией
    // вы не можете использовать глобальные менеджеры, репозитории или кастомные репозитории
    // потому что этот менеджер особый и транзакционный
    // и предположим мы захотим использовать кастомный репозиторий как сервис
    // он имеет "manager" свойство, которое должно быть уникальным инстансом EntityManager
    // но тут нет глобального EntityManager инстанса и не может быть
    // поэтому кастомный менеджеры специфичны для каждого EntityManager'a и не могут быть сервисами
    // это также открывает возможность использовать кастомные репозитории в транзакциях без каких-либо проблем
    const userRepository = manager.getCustomRepository(UserRepository); // НЕ ИСПОЛЬЗУЙТЕ ГЛОАБЛЬНЫЙ getCustomRepository здесь!
    await userRepository.createAndSave("Timber", "Saw");
    const timber = await userRepository.findByName("Timber", "Saw");
});
```
