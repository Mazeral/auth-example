import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { login } from 'src/DTO/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {
  constructor(private readonly user: UserService) {}
  /**Here we search for a user with the properties of the object User
   * then take his object values and test them with what we have in the database
   * after that, if the data matches, we assign the data in the database to the
   * passed data
   */
  async validateUser(data:login) {
    const foundUser: User = await this.user.findOne(data.username);
    if (!foundUser || !(await compare(data.password, foundUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { password, ...result } = foundUser;
    return result;
  }
}
