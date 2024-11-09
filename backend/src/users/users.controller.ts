import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getHello(): Promise<string> {
    console.log('GET request received at /api/users');
    return 'Hello from GET /api/users';
  }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User }> {
    const user = await this.usersService.create(createUserDto);
    return { user };
  }
}
