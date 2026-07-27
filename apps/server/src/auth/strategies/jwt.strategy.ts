import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
  constructor( private readonly prisma: PrismaService ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Get Token from Bearer 
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      omit: {
        password: true, // Prisma 6+
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}