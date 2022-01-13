import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { createuser } from 'dto/createuser.dto';
import { AppService, check } from './app.service';
import { UserService } from './user.service';
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Render('index')
  root() {}

  /***@Post()
  async create(@Body() createuserdto: createuser): Promise<void> {
    const checking = new check();
    return checking.work();
  }*/

  @Post()
  async login(): Promise<any> {}

  @Post()
  async signupUser(@Body() userdata: createuser): Promise<createuser> {
    return this.userService.createUser(userdata);
  }






}
