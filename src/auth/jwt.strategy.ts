import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JwtConstants,
    });
  }
  
  //The payload is of type JSON
  async validate(payload: any) {
    //the console log is not working??
    console.log(payload);
    return {
      userId: payload['user'],
      username: payload['id'],
    };
  }
}
