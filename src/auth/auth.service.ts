import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { login } from 'src/DTO/login.dto';
@Injectable()
export class AuthService {
  constructor(private readonly users: UserService) {}
  /**Here we search for a user with the properties of the object User
   * then take his object values and test them with what we have in the database
   * after that, if the data matches, we assign the data in the database to the
   * passed data
   */
  async validateUser(userData: login) {
    console.log(userData.username);
    const name = userData.username;
    const pass = userData.password;
    const foundUser: User = await this.users.findUserByUsername(name);
    console.log(foundUser);
    if (!foundUser || !(await compare(pass, foundUser['passWord']))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { passWord, ...result } = foundUser;
    return result;
  }
}
