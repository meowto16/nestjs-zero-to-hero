# Валидация. AuthCredentialsDto, сила пароля

Тут работа идет в основном в DTO
```typescript
import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password is too weak' }
  )
  password: string
}
```

Также не забываем добавить ValidationPipe
```typescript
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Post('/signup')
  signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signup(authCredentialsDto)
  }
}
```
