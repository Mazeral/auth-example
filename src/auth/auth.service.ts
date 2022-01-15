import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {} //THIS LINE MAKES US ABLE TO USER PRISMA QUERIES!
  //const isMatch = await bcrypt.compare(password, hash); : this line is copied from the bcrypt of nestjs, it allow us to compare the hashed password to the password in the database.
  async validateUser(
    username: Prisma.UserWhereUniqueInput,
    pass: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: username });
    if (user && bcrypt.compare(pass, user.passWord)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  //The code below is to generate a JWT token (A prove of a correct authentecation)

  async login(
    username: Prisma.UserWhereUniqueInput,
  ): Promise<{ access_token: string }> {
    //Using prisma queries in order to get the username and the id
    const userName = this.prisma.user.findUnique({
      where: username,
      select: { userName: true },
    });
    const id = this.prisma.user.findUnique({
      where: username,
      select: { id: true },
    });
    const payload = { userName, id };
    return {
      //When it says that a variable of the type{x} is not assignable, make the {x} variable type
      access_token: this.jwtService.sign(payload),
    };
  }
}
