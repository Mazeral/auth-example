import { Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, ctx) {
    console.log({ err, user, info, ctx });
    return super.handleRequest(err, user, info, ctx);
  }
}
