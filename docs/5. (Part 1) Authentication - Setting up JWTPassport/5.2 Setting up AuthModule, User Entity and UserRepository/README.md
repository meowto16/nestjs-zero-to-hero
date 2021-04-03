# Настраиваем AuthModule, User Entity и UserRepository

Создаем новый модуль
```shell
nest g module auth

nest g controller auth --no-spec

nest g service auth --no-spec
```

Также создаем новый entity
```typescript
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string
}
```

И новый репозиторий
```typescript
import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
}
```

Модифицируем модуль
```typescript
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]) // Чтобы работал репозиторий
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
```

Инжектим репозиторий в сервис
```typescript
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}
}
```
