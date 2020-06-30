import { UserSeeds } from './user.seeds';
import { ProjectSeeds } from './project.seeds';

import { sequelize } from '../models';

const SeedUp = async () => {
  await sequelize().sync();

  await UserSeeds.down();
  await ProjectSeeds.down();

  return;
};

SeedUp();
