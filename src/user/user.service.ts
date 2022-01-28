import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import console from 'console';
import { Model } from 'mongoose';
import { newUser } from 'src/DTO/newUserDTO.dto';
import { UserDocument, User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  //A create fucntion
  async createUser(data: newUser): Promise<User> {
    try {
      return await this.userModel.create(data);
    } catch (error) {
      console.log(error);
    }
  }

  //A find function, find returns every matching user, thus
  //the return type will be multiple users.
  async findUser(name: string): Promise<User[]> {
    try {
      return this.userModel.find({ username: name });
    } catch (error) {
      console.log(error);
    }
  }

  //For hashing the password
  async hashing(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }
}
