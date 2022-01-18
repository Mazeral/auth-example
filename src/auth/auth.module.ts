import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma.module';
import { UserModule } from 'src/user.module';
import { AuthSerializer } from './serialization.provider';
@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy,AuthSerializer], //the services
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      //In the real project, we want from out token to be stored in ENV var, Insha`a allah it will change soon
      //The token is saved in ENV varialbe
      secret: process.env.JwtConstants,
      signOptions: { expiresIn: '300s' },
    }),
    AuthModule,
    PrismaModule,
    UserModule,
  ], //passport js module in order to make it work
  //Another thing to note: Prisma module is used here in order to make the thing able to work with PrismaServices, this part is really important!
  exports: [AuthService],
})
export class AuthModule {}
