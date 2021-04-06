# Настройка JWT модуля и Passport.js

Passport.js - миддлвара, включает в себя несколько стратегий. Одна из них как раз нужный нам
JWT.

Устанавливаем пакеты
```shell
yarn add @nestjs/jwt @nestjs/passport passport passport-jwt
```

```typescript
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    // Добавляем PassportModule
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Также добавляем JwtModule
    JwtModule.register({
      secret: 'topSecret51', // Задаем свой секретный ключ
      signOptions: {
        expiresIn: 3600, // Указываем, что истекает через час
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
```

### [@nestjs/passport (github)](https://github.com/nestjs/passport)

### [@nestjs/jwt (github)](https://github.com/nestjs/jwt)
