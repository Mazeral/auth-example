import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //To use cookies (sessions)!
  app.use(
    session({
      secret: process.env.cookieVar,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true },
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
