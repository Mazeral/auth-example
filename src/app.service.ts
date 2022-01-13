import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class check {
  // static work() {
  //   console.log('its working!');
  /*turns out that the problem was that I didn't use the 'new' keyword, when assigning  a var to a class the syntax should be :
  const varName = new className


  and then we can access the class functions using the varName!
   */
  // }

  work(): void {
    console.log('its working!');
  }
}
