import { Role1 } from '../database/models';

export interface UserPayload {
  id: number;
  email: string;
  globalRole: Role1;
}
