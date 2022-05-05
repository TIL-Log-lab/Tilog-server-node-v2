import { users } from '@prisma/client';

export interface UpsertUserAndGetIdResponse {
  id: users['id'];
}
