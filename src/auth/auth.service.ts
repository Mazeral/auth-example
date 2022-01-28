import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { login } from 'src/DTO/login.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(private readonly user: UserService) {}
  /**Here we search for a user with the properties of the object User
   * then take his object values and test them with what we have in the database
   * after that, if the data matches, we assign the data in the database to the
   * passed data
   */
  async validateUser(userData: login) {
    //commented for now : 
    // const foundUser: User[] = await this.user.findUser(userData.username);
    // console.log(foundUser);
    // if (!foundUser || !(await compare(pass, foundUser['passWord']))) {
    //   throw new UnauthorizedException('Incorrect username or password');
    // }

    // const { passWord, ...result } = foundUser;
    // console.log(result);
    // return result;

    return null //this will be deleted in the future
  }
}
