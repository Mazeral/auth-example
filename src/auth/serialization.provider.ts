/**Serializer for out cookie! */

import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { User } from 'src/DTO/user.dto';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly user: UserService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: { id: string }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: { id: string },
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    // to be edited
    // const user = await this.user.findUserById(payload.id);
    // done(null, user);
    return null;
  }
}
