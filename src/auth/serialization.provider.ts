import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
/**Serializer for out cookie! */

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly user: UserService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: { id: number }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: { id: number },
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    const user = await this.user.findOne(payload.id);
    done(null, user);
  }
}
