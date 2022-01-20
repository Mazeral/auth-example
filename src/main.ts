import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(passport.initialize());
  app.use(
    session({
      secret: process.env.cookieVar, //This is how we access how dotenv variables
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 3, httpOnly: true, secure: true },
    }),
  );

  //This fixed a wierd problem...
  app.useStaticAssets(join(process.cwd(), './public'));
  app.setBaseViewsDir(join(process.cwd(), './views'));
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
