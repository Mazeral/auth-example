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
import { UserService } from './user/user.service'; import { AuthService } from './auth/auth.service';
import { login } from './DTO/login.dto';
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    // private readonly auth: AuthService,
  ) {}

  /**Controllers for out application! */

  @Get()
  @Render('index.hbs')
  getindex() {}

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

  // @UseGuards(LoggedInGuard)
  @Get('chat')
  @Render('chat.hbs')
  getChat() {}

  @Post('signUp')
  @Redirect('signIn')
  async signUpPOST(@Body() signup): Promise<void> {
    //edited the createUser function in the userService in order to have more
    //control over inputs!
    const password = this.userService.pwdcrpt(signup.passWord);
    //We used await with the password because in order to generate it, we need
    //first to trigger a asynchronic function
  }

  @Post('signIn')
  @Redirect('chat')
  //Body is important to SPECIFY the data sent with the post request
  //The post sends data sent via the form, since the form has multiple values,
  //it sends an object, that's why we have a Body() of type login!
  async postLogin(@Req() req, @Body() userdata: login) {
    return req.session;
  }
}
