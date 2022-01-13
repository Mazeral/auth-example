import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userName: string, passWord: string): Promise<any> {
    const user = await this.userService.user(userame);
    if (user && user.passWord === pass) {
      const { passWord, ...result } = user;
      return result;
    }
    return null;
  }
}
