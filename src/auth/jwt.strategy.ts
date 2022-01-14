import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JwtConstants,
    });
  }

  async validate(payload: User) {
    return {
      userId: this.prisma.user.findUnique({
        where: payload,
        select: { id: true },
      }),
      username: this.prisma.user.findUnique({
        where: payload,
        select: { userName: true },
      }),
    };
  }
}
