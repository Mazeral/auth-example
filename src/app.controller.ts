import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
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
} 


//LocalAuthGuard is a class that was created in auth file in order to avoid magical strings, its used for defining what strategy we are using from passportjs for the Post() request and the login function as well, when it works, it will generate a token for the user in order to go the chat page



/***@Post()
async create(@Body() createuserdto: createuser): Promise<void> {
  const checking = new check();
  return checking.work();
}*/
