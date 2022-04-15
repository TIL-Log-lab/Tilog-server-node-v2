import { users } from '@prisma/client';

export interface TokenPayload {
  userId: users['id'] | null;
}
