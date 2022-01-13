import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { createuser } from 'dto/createuser.dto';
import { AppService, check } from './app.service';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma, prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private authService: AuthService,
  ) {}
  @Get()
  @Render('index')
  root() {}

  /***@Post()
  async create(@Body() createuserdto: createuser): Promise<void> {
    const checking = new check();
    return checking.work();
  }*/
  @UseGuards(LocalAuthGuard) //LocalAuthGuard is a class that was created in auth file in order to avoid magical strings.
  @Post()
  async login(username: Prisma.UserWhereUniqueInput) {
    return this.authService.login(username);
  }

  @Post()
  async signupUser(@Body() userdata: createuser): Promise<createuser> {
    return this.userService.createUser(userdata);
  }
}
