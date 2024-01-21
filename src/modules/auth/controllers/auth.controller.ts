import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dto/auth-dto';
import { RoleGuard } from '../guard/role.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: AuthDto) {
    return await this.authService.login(body.username, body.password);
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard, RoleGuard)
  @Get('test-auth')
  test(@Req() req) {
    console.log(req.user);
    return {
      name: 'Jonata',
    };
  }
}
