import { Controller, Post, UseGuards, Request, Response } from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const token = await this.authService.login(req.user);
    console.log('Generated JWT Token:', token.access_token);
    // Set the token as an HTTP-only cookie
    res.cookie('token', token.access_token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your needs
      maxAge: 3600000, // 1 hour in milliseconds
    });

    return { message: 'Login successful' };
  }
  @Post('logout')
  async logout(@Response({ passthrough: true }) res) {
    res.clearCookie('token');
    return { message: 'Logout successful' };
  }
}
