// src/redis/redis.module.ts

import { Module } from '@nestjs/common';
import * as Redis from 'redis';

import { REDIS } from './redis.constants';
@Module({
  providers: [
    {
      provide: REDIS,
      useValue: Redis.createClient({ url: process.env.REDIS_URL }),
    },
  ],
  exports: [REDIS], //Please remember that you export the services and
  //the variables...etc not the module it self
})
export class RedisModule {}
