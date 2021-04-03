# Feature. Регистрация

Создаем DTO. Называем его `auth-credentials.dto.ts` (такое название, потому что
пока мы будем использовать один DTO и для логина и для регистрации)
```typescript
export class AuthCredentialsDto {
  username: string
  password: string
}
```

Добавляем метод в репозитории
```typescript
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const user = new User()
    user.username = username
    user.password = password

    await user.save()
  }
}
```

Добавляем метод в сервисе
```typescript
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto)
  }
}
```

Добавляем обработчик в контроллере
```typescript
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  // NestJS сам возвращает 201
  @Post('/signup')
  signup(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signup(authCredentialsDto)
  }
}
```
