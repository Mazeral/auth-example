import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma resources/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma resources/prisma.module';
import { AuthService } from './auth/auth.service';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import { REDIS ,RedisModule} from './redis'
import * as passport from 'passport';
import RedisClient from 'redis';

@Module({
  imports: [AuthModule, PrismaClient, UserModule, PrismaModule,RedisModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, AuthService,Logger],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 1000*60*30,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
