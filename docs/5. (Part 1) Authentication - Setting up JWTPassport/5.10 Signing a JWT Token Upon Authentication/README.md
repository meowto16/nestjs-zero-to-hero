# Подписываем JWT токен на аутентификации

Сначала создадим `jwt-payload.interface.ts`
```typescript
export interface JwtPayload {
  username: string
}
```

Добавляем подпись токена в метод signIn
```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    // Инжектим jwtService
    private jwtService: JwtService
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn (authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto)

    if (!username) {
      throw new UnauthorizedException('Invalid credentials')
    }
    
    const payload: JwtPayload = { username } // Указываем интерфейс, который создали ранее

    // Подписываем токен
    const accessToken = await this.jwtService.sign(payload)

    // Отдаем клиенту
    return { accessToken }
  }
}
```

Немного меняем контроллер (говорим, что возвращает accessToken)
```typescript
  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn((authCredentialsDto))
  }
```

