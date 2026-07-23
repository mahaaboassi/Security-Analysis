import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwt.sign({
      sub: user.id,
      username: user.username,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      address: user.address,
      file: user.file,
      accessToken: token,
    };
  }
  async register(dto: RegisterDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (user) throw new UnprocessableEntityException('Username already in use');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    })
    const token = this.jwt.sign({
      sub: newUser.id,
      username: newUser.username,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      address: newUser.address,
      file: newUser.file,
      accessToken: token,
    };
  }
}