import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  //VALIDATE FUNCTION MUST HAVE 2 PARAMETERS!
  async validate(username: string, password: string) {
    //this howeverm does not, we can bring the username and the passord and
    //make this a one object if we wanted
    //an example of this :
    //return this.authService.validateUser({ email, password });
    //after this, we can make the validateUser in the service have a type
    //of a DTO!
    const usertest = await this.authService.validateUser({username,password});
    if (!usertest) throw new UnauthorizedException();

    return usertest;
  }
}
