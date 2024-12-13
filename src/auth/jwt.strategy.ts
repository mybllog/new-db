/* eslint-disable prettier/prettier */
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt';
// import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      secretOrKey: process.env.JWT_KEY||'6PAOIeoalwiU+QJaMQa6pSrOqrFcde7waotpz4cCjkI=', // Secret key for JWT (ensure JWT_KEY is in your .env file)
      ignoreExpiration: false, // Do not ignore expiration
    });

    console.log("The JWT key is ", process.env.JWT_KEY);
    // print('');
  }

  async validate(payload: any) {
    // Add logic to validate the payload (e.g., check user status)
    return { userId: payload.sub, email: payload.email }; // Add more properties if needed
  }
}
