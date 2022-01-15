import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseGuards,
} from '@nestjs/common';
import { createuser } from 'dto/createuser.dto';
import { AppService, check } from './app.service';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma, prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { signIn } from 'dto/signIN.dto';
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  //Get for index
  @Get()
  @Render('index.hbs')
  root() {
    console.log('index.hbs is working');
  }

  //Get for signUp
  @Get('signUp.hbs')
  @Render('signUp.hbs')
  signUp() {
    console.log('signUp appeared');
  }

  //Get for signIn
  @Get('signIn.hbs')
  @Render('signIn.hbs')
  signIn() {
    console.log('signIn is working');
  }

  //Get for chat
  /*@UseGuards(JwtAuthGuard) // be careful of this shit, decorators without functions can ruin the who code program and it's applications!
  @Get('chat.hbs')*/

  /**Post requests! */
  //Post request for signUp
  @Post('signUp.hbs')
  @Render('signIn.hbs')
  async signUpPOST(@Body() signup: createuser): Promise<void> {
    //edited the createUser function in the userService in order to have more control over inputs!
    const password = this.userService.pwdcrpt(signup.passWord);
    //We used await with the password because in order to generate it, we need first to trigger a asynchronic function
    this.userService.createUser(signup.userName, await password, signup.email);
  }

  //Post reqeust for signIn
  // @UseGuards(LocalAuthGuard) //Guards run before the functions of the HTTP requests,
  @Post('signIn.hbs')
  @Render('chat.hbs')
  async signInPOST(@Body() login: signIn): Promise<User> {
    
    return this.authService.validateUser(login.userName, login.password);
  }
}

//LocalAuthGuard is a class that was created in auth file in order to avoid magical strings, its used for defining what strategy we are using from passportjs for the Post() request and the login function as well, when it works, it will generate a token for the user in order to go the chat page

/***@Post()
async create(@Body() createuserdto: createuser): Promise<void> {
  const checking = new check();
  return checking.work();
}*/
