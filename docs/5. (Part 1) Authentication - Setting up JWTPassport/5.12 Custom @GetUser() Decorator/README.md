# Кастомный @GetUser декоратор

Создаем новый файл `get-user.decorator.ts`

```typescript
import { createParamDecorator } from '@nestjs/common'
import { User } from './user.entity'

const GetUser = createParamDecorator((data, req): User => {
  return req.user
})

export default GetUser
```

Применяем в контроллере
```typescript
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user)
  }
```
