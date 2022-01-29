/**Created this module inorder to fix a problem related to modules. */

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
@Module({
  //PrismaService is a provider because user.service uses some functions of prisma
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
