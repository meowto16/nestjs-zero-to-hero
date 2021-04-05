# Feature. Валидация пароля - логин

Делаем логин, проверку пароля.

Начинаем с сущности юзера, добавим там новый метод.
Не знаю, правильно ли делает преподаватель, что добавляет метод прямо в сущность.
```typescript
async validatePassword(password: string): Promise<boolean> {
const hash = await bcrypt.hash(password, this.salt)
return hash === this.password
}
```

Затем добавляем новый метод в репозиторий
```typescript
async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
const { username, password } = authCredentialsDto
const user = await this.findOne({ username })

if (user && await user.validatePassword(password)) {
  return user.username
} else {
  return null
}
}
```

И добавляем новый метод в сервис
```typescript
async signIn (authCredentialsDto: AuthCredentialsDto) {
const username = await this.userRepository.validateUserPassword(authCredentialsDto)
  
// Выбрасываем Unauthorized если неправильные credentials
if (!username) {
  throw new UnauthorizedException('Invalid credentials')
}
}
```

Ну и добавляем обработчик в контроллер
```typescript
@Post('/signin')
signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) { // Используем тот же DTO что и для регистрации
    return this.authService.signIn((authCredentialsDto))
}
```

### Заметка от преподавателя
> Правильнее всегда возвращать "Неправильные данные", а не "неправильный логин" и "неправильный пароль".
