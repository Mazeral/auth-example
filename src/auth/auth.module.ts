import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule,
    PassportModule.register({
      session: true,
    }),
  ] ,
  providers: [AuthService, LocalStrategy, AuthSerializer, UserService ],
})
export class AuthModule {}
