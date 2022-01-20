import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma resources/prisma.service';
import { UserService } from 'src/user/user.service';
/**Serializer for out cookie! */

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(
    private readonly user: UserService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: { id: string }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: { id: string },
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    const user = await this.prisma.user.findUnique({
      where: this.user.findSpecificUserById(payload.id),
    });
    done(null, user);
  }
}
