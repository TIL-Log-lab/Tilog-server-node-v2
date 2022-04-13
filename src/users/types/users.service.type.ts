import { users } from '@prisma/client';

export interface UpSertUserAndGetIdResponse {
  id: users['id'];
}
