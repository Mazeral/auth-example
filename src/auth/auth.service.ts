import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
  ) {}
  /**Here we search for a user with the properties of the object User
   * then take his object values and test them with what we have in the database
   * after that, if the data matches, we assign the data in the database to the
   * passed data
   */
  async validateUser(username:string,password:string) {
    const foundUser: User = await this.user.findUserByUsername(username)
    console.log(foundUser + `FOUND THE USER!!!!!!!!!!!!`);
    if (!foundUser || !(await compare(password, foundUser['passWord']))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { passWord, ...result } = foundUser;
    console.log(result + `THIS IS THE RESSSSSSSULT!!!!!`);
    return result;
  }
}
