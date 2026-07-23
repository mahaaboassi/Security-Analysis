import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (req: Request) => {
      //     return req?.cookies?.accessToken; //  Get Token from Cookies
      //   },
      // ]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Get Token from Bearer 
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}