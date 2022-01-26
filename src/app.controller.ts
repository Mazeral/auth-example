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
import { LoggedInGuard } from './auth/logged-in.guard';
import { UserService } from './user/user.service';
import { User } from '@prisma/client';
import { AuthService } from './auth/auth.service';
import { login } from './DTO/login.dto';
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly auth: AuthService,
  ) {}

  /**Controllers for out application! */

  @Get()
  @Render('index.hbs')
  getindex() {
    return null;
  }

  @Get('signIn')
  @Render('signIn.hbs')
  getLogin(@Req() req) {
    return req.user;
  }

  @Get('signUp')
  @Render('signUp.hbs')
  getRegister(@Req() req) {
    return req.user;
  }

  @UseGuards(LoggedInGuard)
  @Get('chat')
  @Render('chat.hbs')
  getChat() {
    return null;
  }

  @Post('signUp')
  @Redirect('signIn')
  async signUpPOST(@Body() signup: User): Promise<void> {
    //edited the createUser function in the userService in order to have more
    //control over inputs!
    const password = this.userService.pwdcrpt(signup.passWord);
    //We used await with the password because in order to generate it, we need
    //first to trigger a asynchronic function
    this.userService.createUser(signup.userName, await password, signup.email);
  }

  @Post('signIn')
  @Redirect('chat')
  //Body is important to SPECIFY the data sent with the post request
  //The post sends data sent via the form, since the form has multiple values,
  //it sends an object, that's why we have a Body() of type login!
  async postLogin(@Req() req, @Body() userdata: login) {
    console.log(req.session);
    await this.auth.validateUser(userdata);
    return req.session;
  }
}
//this.auth.validateUser(userdata);
