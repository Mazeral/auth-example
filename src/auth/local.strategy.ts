import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string,password:string) {
    console.log(username +" "+  password + ` THIS IS THE DATA THAT THE VALIDATE FUNCTION RECEIVES!!!!!!!!`);
    const usertest = await this.authService.validateUser(username,password);
    if (!usertest) throw new UnauthorizedException();

    return usertest;
  }
}
