import { Controller, Post, Body, BadRequestException, ConflictException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true })) // прибирає зайві поля
  async register(@Body() body: RegisterDto) {
    try {
      return await this.userService.register(body.username, body.password);
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique_violation
        throw new ConflictException('Username already exists');
      }
      throw new BadRequestException(error.message || 'Registration failed');
    }
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.userService.login(body.username, body.password);
  }
}
