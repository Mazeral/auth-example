import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
@Module({
  imports: [AuthModule,PrismaClient],
  controllers: [AppController],
  providers: [AppService,UserService,PrismaService],
})
export class AppModule {}
