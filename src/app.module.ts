import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [UserModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
