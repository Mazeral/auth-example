import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
} from '@nestjs/common';
import { login } from './DTO/login.dto';
import { UserService } from './user/user.service';
import { newUser } from './DTO/newUserDTO.dto';

@Controller()
export class AppController {
  constructor(
    private readonly user: UserService, // private readonly auth: AuthService,
  ) {}

  /**Controllers for out application! */

  @Get()
  @Render('index.hbs')
  getindex() {
    //this is intensional
  }

  @Get('signIn')
  @Render('signIn.hbs')
  getLogin(@Req() req) {
    return req.user;
  }

  @Get('getall')
  getall()
  {
    return this.user.getall()
  }

  @Get('signUp')
  @Render('signUp.hbs')
  getRegister(@Req() req) {
    return req.user;
  }

  @Get('chat')
  @Render('chat.hbs')
  getChat() {
    //this is intentional
  }

  @Post('signUp')
  @Redirect('signIn')
  async signUpPOST(@Body() signup: newUser): Promise<void> {
    //edited the createUser function in the userService in order to have more
    //control over inputs!
    try {
      signup.password = await this.user.pwdcrpt(signup.password);
      this.user.make(signup);
    } catch (error) {
      console.log(error.message);
    }

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
