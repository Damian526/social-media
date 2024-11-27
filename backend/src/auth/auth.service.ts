import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userWithoutPassword } = user; // Remove password field
      return userWithoutPassword;
    }
    return null;
  }

  // Generate JWT token
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    console.log('JWT Payload for Signing:', payload); // Debugging
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
