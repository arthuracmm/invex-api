import { Controller, Post, Body, UnauthorizedException, Res, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(
    @Body() body: LoginUserAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.login(user);

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: isProd,                         // HTTPS somente em produção
      sameSite: isProd ? 'none' : 'lax',      // 'none' só no HTTPS
      domain: isProd ? '.hugozera.space' : undefined, // não usar domain no localhost
    });


    return { access_token: token.access_token };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
