/**Created this module inorder to fix a problem related to modules. */

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
@Module({
  providers: [UserService,PrismaService],
  exports: [UserService],
})
export class UserModule {}
