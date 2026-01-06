import { Sequelize } from 'sequelize';
import { Users, UserModel} from './user';
export * from './user'

interface Models {

  Users: typeof Users;
}

export const allModel = (sequelize: Sequelize): Models => {
  
  const Users = UserModel(sequelize);

  return {
   
    Users,
  };
};

export { Users };
