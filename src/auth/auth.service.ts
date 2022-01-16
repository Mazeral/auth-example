import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user.service';
@Injectable()
export class AuthService {
  constructor(
    //Injecting services into the auth.services
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {} //THIS LINE MAKES US ABLE TO USER PRISMA QUERIES!
  //const isMatch = await bcrypt.compare(password, hash); : this line is copied from the bcrypt of nestjs, it allow us to compare the hashed password to the password in the database.
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: this.userService.findSpecificUser(username),
    });
    const hashedPas = user.passWord;

    if (await bcrypt.compare(pass, hashedPas)) {
      const {passWord, ...result } = user;
      return result;
    }
    return null;
  }

  //The code below is to generate a JWT token (A prove of a correct authentecation)

  async login(username: JSON): Promise<{ access_token: string }> {
    //Using prisma queries in order to get the username and the id
    //using the queries was a mistake, it was a mistake because the browser was sending an object which is the (result in the result above), it should've been like recieving the object and then taking the values we need



    /* const prismauserName = this.prisma.user.findUnique({
      where: this.userService.findSpecificUser(username),
      select: { userName: true },
    });
    const prismaId = this.prisma.user.findUnique({
      where: this.userService.findSpecificUser(username),
      select: { id: true },
    });
*/



    //extracting the userName and the id which they are string from the object!
    const userName: string = username['userName'];
    const id: string = username['id'];
    const payload = { userName, id };
    console.log(this.jwtService.sign(payload));
    return {
      //When it says that a variable of the type{x} is not assignable, make the {x} variable type
      access_token: this.jwtService.sign(payload),
    };
  }
}
