import type { Response } from 'express';
import { Body, Controller, Post, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GetUser } from './decorators/get-user.decorator';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuardCookie } from './guards/jwt.guard.cookie';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto, 
  @Res({ passthrough: true }) res: Response) {
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
  
  // Authentication functionality when set cookie from server to frontend
  @Post('login/cookie')
  loginWithCookie(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginWithCookie(dto,res);
  }
  
  @UseGuards(JwtAuthGuardCookie)
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @UseGuards(JwtAuthGuardCookie)
  @Get('me/cookie')
  getMeWithCookie(@GetUser() user: any) {
    return user;
  }
}