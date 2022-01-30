import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer, UserService],
})
export class AuthModule {}
