import { Module } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, Repository],
  exports: [UserService, Repository],
})
export class UserModule {}
