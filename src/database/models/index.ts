import { Sequelize } from 'sequelize';
import { Users, UserModel } from './user';
import { Avec, AvecModel } from './avec';
import { AvecMember, AvecMemberModel } from './avecMember';
import { Cycle, CycleModel } from './cycle';

// Typage central des modèles
export interface Models {
  Users: typeof Users;
  Avec: typeof Avec;
  AvecMember: typeof AvecMember;
  Cycle: typeof Cycle;
}

// Re-export des modèles pour les utiliser ailleurs si besoin
export * from './user';
export * from './avec';
export * from './avecMember';
export * from './cycle';

export const initModels = (sequelize: Sequelize): Models => {
  // ⚡ Initialisation unique des modèles
  const UsersModel = UserModel(sequelize);
  const AvecModelInstance = AvecModel(sequelize);
  const AvecMemberModelInstance = AvecMemberModel(sequelize);
  const CycleModelInstance = CycleModel(sequelize);

  const models: Models = {
    Users: UsersModel,
    Avec: AvecModelInstance,
    AvecMember: AvecMemberModelInstance,
    Cycle: CycleModelInstance,
  };

  // ⚡ Associations UNIQUES
  Object.values(models).forEach((model: any) => {
    if (
      'associate' in model &&
      typeof model.associate === 'function' &&
      !model.associated
    ) {
      model.associate(models);
      model.associated = true;
    }
  });

  return models;
};
