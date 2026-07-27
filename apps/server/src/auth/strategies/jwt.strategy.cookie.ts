import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy,"jwt-cookie") {
  constructor( private readonly prisma: PrismaService, ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.accessToken; //  Get Token from Cookies
        },
      ]),
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