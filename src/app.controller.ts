import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
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
  getIndex(@Req() req) {
    return;
  }

  //Get for signUp
  @Get('signUp.hbs')
  @Render('signUp.hbs')
  getSignUp(@Req() req) {
    return req.user;
  }

  //Get for signIn
  @Get('signIn.hbs')
  @Render('signIn.hbs')
  getsignIn(@Req() req) {
    return req.user;
  }

  //LocalAuthGuard is a class that was created in auth file in order to avoid magical strings, its used for defining what strategy we are using from passportjs for the Post() request and the login function as well, when it works, it will generate a token for the user in order to go the chat page
  //Post reqeust for signIn
  // @UseGuards(LocalAuthGuard) //Guards run before the functions of the HTTP requests,
  @UseGuards(LocalAuthGuard)
  @Post('signIn.hbs')
  @Redirect('chat.hbs')
  async signInPOST(@Req() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

 @UseGuards(JwtAuthGuard)
  @Get('chat.hbs')
  @Render('chat.hbs')
  getProfiel(@Req() req) {
    console.log(req.user);
    return req.user;
  }

  //Get for chat
  /*@UseGuards(JwtAuthGuard) // be careful of this shit, decorators without functions can ruin the who code program and it's applications!
  @Get('chat.hbs')*/

  /**Post requests! */
  //Post request for signUp
  @Post('signUp.hbs')
  @Redirect('signIn.hbs')
  async signUpPOST(@Body() signup: createuser): Promise<void> {
    //edited the createUser function in the userService in order to have more control over inputs!
    const password = this.userService.pwdcrpt(signup.passWord);
    //We used await with the password because in order to generate it, we need first to trigger a asynchronic function
    this.userService.createUser(signup.userName, await password, signup.email);
  }
}
