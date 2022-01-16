import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  //Creates a user
  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: { userName: username, email: email, passWord: password },
    });
  }

  //This function was added in order to make passing a username with the type string instead of type UserWhereUniqueInpt possible and it worked.
  findSpecificUser(userName: string): Prisma.UserWhereUniqueInput {
    return Prisma.validator<Prisma.UserWhereUniqueInput>()({
      userName,
    });
  }

  async user(
    //Search a user by a unique value, username in out case:
    userWhereUniqueInput: Prisma.UserWhereUniqueInput, //the red one can be named anything, the yellow one is the type
  ): Promise<User | null> {
    //The null here is because we might end up by not finding any user with the wanted details
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  //using bcrypt to hash the password!
  async pwdcrpt(password: string): Promise<string> {
    return await bcrypt.hashSync(password, 10);
  }
}
