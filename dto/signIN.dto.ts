import { Prisma } from "@prisma/client";

export class signIn {
  userName: Prisma.UserWhereUniqueInput;
  password: string;
}
