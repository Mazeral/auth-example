import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  serializeUser(
    user: any,
    done: (err: Error, user: { id: number; username: string }) => void,
  ) {
    done(null, { id: user.id, username: user.username });
  }

  deserializeUser(
    payload: { id: string; username: string },
    done: (err: Error, user: Omit<any, 'password'>) => void,
  ) {
    const user = this.authService.userIdHunt(payload.id);
    done(null, user);
  }
}
