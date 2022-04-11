import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';

@Injectable()
export class ExampleCodeService {
  get(userId: users['id']) {
    return `hello ${userId}!`;
  }
}
