import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from './user.entity'

const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest()
  return req.user
})

export default GetUser
