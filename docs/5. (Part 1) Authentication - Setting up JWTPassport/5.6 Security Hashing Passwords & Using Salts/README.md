# Безопасность. Хэширование паролей, использование соли

Устанавливаем пакет `bcrypt`
```shell
yarn add bcrypt
```

Немного изменим сущность `user`
```typescript
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  salt: string // Добавляем новую колонку. Соль
}
```

Теперь дорабатываем метод в репозитории
```typescript
import { EntityRepository, Repository } from 'typeorm'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { User } from './user.entity'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const user = new User()
    user.username = username
    // генерируем динамическую соль
    user.salt = await bcrypt.genSalt()
    // Кстати, похоже не обязательно рядом хранить соль, так как bcrypt.hash уже в себе ее содержит
    // Но лучше уточнить, прочитал на одном ресурсе
    user.password = await this.hashPassword(password, user.salt) // хэшируем пароль

    try {
      await user.save()
    } catch (error) {
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  // Функция хэширования пароля
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
```

## [Управление паролями (статья)](https://medium.com/@balovbohdan/%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D0%B0%D1%80%D0%BE%D0%BB%D1%8F%D0%BC%D0%B8-82d99005207#4fba)
