/**Created this module in order to make auth.model able to use Prisma services, make everything in a file next time! */
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
