import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { session } from 'passport';
import { RequestHandler } from "express";
import { Store, SessionData, SessionOptions } from "express-session";
import { Pool, PoolConfig } from "pg";
import connectPgSimple from 'connect-pg-simple';
import * as pg from 'pg'
@Module({
  imports: [AuthModule, PrismaClient],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule implements NestModule {
  constructor(){}
  const pgPool = new pg.Pool({
    
  })
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(session{
        store: new (require ('connect-pg-simple')(session))
        ({

        }),
      })
  }
}
