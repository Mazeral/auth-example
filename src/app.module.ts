import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma resources/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma resources/prisma.module';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [AuthModule, PrismaClient, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, AuthService],
})
export class AppModule {}
