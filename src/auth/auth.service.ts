import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {} //THIS LINE MAKES US ABLE TO USER PRISMA QUERIES!
  //const isMatch = await bcrypt.compare(password, hash); : this line is copied from the bcrypt of nestjs, it allow us to compare the hashed password to the password in the database.
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: this.userService.findSpecificUser(username),
    });
    if (user && bcrypt.compare(pass, user.passWord)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  //The code below is to generate a JWT token (A prove of a correct authentecation)

  async login(username: string): Promise<{ access_token: string }> {
    //Using prisma queries in order to get the username and the id
    const userName = this.prisma.user.findUnique({
      where: this.userService.findSpecificUser(username),
      select: { userName: true },
    });
    const id = this.prisma.user.findUnique({
      where: this.userService.findSpecificUser(username),
      select: { id: true },
    });
    const payload = { userName, id };
    return {
      //When it says that a variable of the type{x} is not assignable, make the {x} variable type
      access_token: this.jwtService.sign(payload),
    };
  }
}
