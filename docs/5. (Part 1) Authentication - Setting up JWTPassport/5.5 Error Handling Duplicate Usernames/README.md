# Обработка ошибок. Дублирующиеся username

Меняем сначала `user.entity.ts`
```typescript
@Entity()
@Unique(['username']) // Указываем, что username у нас уникальный (будет выкидывать 500)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string
}
```

Теперь дорабатываем репозиторий. А именно, метод `signUp`
```typescript
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const user = new User()
    user.username = username
    user.password = password

    try {
      await user.save()
    } catch (error) {
      // Проверяем код ошибки (можно было вынести в отдельную переменную код
      // чтобы не было магических чисел
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Username already exists') // Такое исключение NestJS обработает. Будет 409 ошибка и сообщение
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
```
