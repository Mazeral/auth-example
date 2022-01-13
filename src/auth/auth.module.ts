import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants';
@Module({
  providers: [AuthService, LocalStrategy], //the services
  imports: [
    PassportModule,
    JwtModule.register({
      //In the real project, we want from out token to be stored in ENV var, Insha`a allah it will change soon
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ], //passport js module in order to make it work
})
export class AuthModule {}
