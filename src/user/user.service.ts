import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor() {}

  //using bcrypt to hash the password!
  async pwdcrpt(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }
}
