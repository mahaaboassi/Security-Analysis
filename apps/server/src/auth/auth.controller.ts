import type { Response } from 'express';
import { Body, Controller, Post, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GetUser } from './decorators/get-user.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto,res);
  }

  @Post('register')
  register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(dto,res);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: any) {
    return user;
  }
}