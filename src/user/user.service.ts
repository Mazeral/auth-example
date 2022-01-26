import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma resources/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  //Creates a user
  async createUser(username: string, password: string, email: string) {
    return this.prisma.user.create({
      data: { userName: username, email: email, passWord: password },
    });
  }

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { userName: username } });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  //using bcrypt to hash the password!
  async pwdcrpt(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }
}

// //This function was added in order to make passing a username with the type string instead of type UserWhereUniqueInpt possible and it worked.
// findSpecificUserByUserName(userName: string): Prisma.UserWhereUniqueInput {
//   return Prisma.validator<Prisma.UserWhereUniqueInput>()({
//     userName,
//   });
// }
