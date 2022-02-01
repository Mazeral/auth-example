import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { newUser } from 'src/DTO/newUserDTO.dto';
@Injectable()
export class UserService {
  //To use typeORM queries we inject the entity file this way:
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  //creates a new User
  async make(data: newUser): Promise<User> {
    return this.user.save(data);
  }
  //finds a User
  async findOne(name: string): Promise<User> {
    return this.user.findOne({ where: { username: name } });
  }
  async findOneID(ID: number): Promise<User> {
    return this.user.findOne({ where: { id: ID } });
  }

  //using bcrypt to hash the password!
  async pwdcrpt(password): Promise<string> {
    try {
      return bcrypt.hashSync(password, 10);
    } catch (e) {
      throw console.log(e.message + ' pwdcrypt error');
    }
  }

  async findID(id: number) {
    return this.user.findOne(id);
  }

  async getall(): Promise<User[]> {
    return this.user.find();
  }
}
