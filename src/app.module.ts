import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.DATABASE_URL) ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
