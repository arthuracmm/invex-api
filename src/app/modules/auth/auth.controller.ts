import { Controller, Post, Body, UnauthorizedException, Res, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('login')
  async login(
    @Body() body: LoginUserAuthDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: any,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.login(user);

    const isProd = process.env.NODE_ENV === 'production';

    let cookieDomain: string | undefined = undefined;
    if (isProd) {
      const origin = req.headers.origin || '';
      if (origin.includes('hugozera.space')) {
        cookieDomain = '.hugozera.space';
      } else {
        cookieDomain = '.hugozera.space';
      }
    }

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: isProd,                         // HTTPS somente em produção
      sameSite: isProd ? 'none' : 'lax',      // 'none' só no HTTPS
      domain: cookieDomain, // definir dinâmicamente com base na origem
    });


    return { access_token: token.access_token };
  }

  @Post('register')
  async register(@Body() body: any, @Res({ passthrough: true }) res: Response, @Req() req: any) {
    const secretKey = process.env.REGISTRATION_KEY || 'invex-secret-key'; // Fallback default or strictly Env
    if (body.secretKey !== secretKey) {
      throw new UnauthorizedException('Chave de convite inválida.');
    }

    const user = await this.usersService.createUser(body);
    // const token = await this.authService.login(user); // Auto-login after register
    return this.login({ email: body.email, password: body.password } as any, res, req); // Re-use login logic for cookie set
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
