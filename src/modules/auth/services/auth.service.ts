import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MessagesHelper } from 'src/config/constants/messages.helpers';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async login(username: string, password: string) {
    const user = await this.validateCredentials(username, password);

    const payload = {
      sub: user.id,
      username: user.name,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async validateCredentials(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: username,
      },
    });

    const isValid = bcrypt.compareSync(password, user.password);
    if (user.password && isValid) {
      return user;
    }

    if (!user || user === null) {
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    }
  }
}
