import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {} //THIS LINE MAKES US ABLE TO USER PRISMA QUERIES!

  async validateUser(
    username: Prisma.UserWhereUniqueInput,
    pass: Prisma.UserWhereUniqueInput,
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: username });
    if (user && user.passWord === pass) {
      const { passWord, ...result } = user;
      return result;
    }
    return null;
  }

  //The code below is to generate a JWT token (A prove of a correct authentecation)

  async login(
    username: Prisma.UserWhereUniqueInput,
  ): Promise<{ access_token: string }> {
    //Using prisma queries in order to get the username and the password of every
    const userName = this.prisma.user.findUnique({
      where: username,
      select: { userName: true },
    });
    const passWord = this.prisma.user.findUnique({
      where: username,
      select: { passWord: true },
    });
    const payload = { userName, passWord };
    return {
      //When it says that a variable of the type{x} is not assignable, make the {x} variable type
      access_token: this.jwtService.sign(payload),
    };
  }
}
