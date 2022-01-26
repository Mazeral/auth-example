import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { login } from 'src/DTO/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(userdata: login) {
    const usertest = await this.authService.validateUser(userdata);
    if (!usertest) throw new UnauthorizedException();

    return usertest;
  }
}
