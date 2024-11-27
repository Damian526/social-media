import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies?.token, // Extract token from cookies
      ]),
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: process.env.JWT_SECRET, // Ensure this matches your .env value
    });
  }

  async validate(payload: any) {
    console.log('Decoded JWT Payload:', payload); // Debugging
    return { userId: payload.sub, username: payload.username }; // Attach to req.user
  }
}