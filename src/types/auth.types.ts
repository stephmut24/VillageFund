import { Role1 } from '../database/models';

export interface UserPayload {
  id: string;
  email: string;
  globalRole: Role1;
}
