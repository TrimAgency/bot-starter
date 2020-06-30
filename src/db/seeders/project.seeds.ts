import { Project } from '../models/project.model';
import { logger } from '../../server';
import { throwError } from '../../errors/throw-error';

export const ProjectSeeds = {
  up: async () => {
    Project.bulkCreate([
      {
        name: 'John Doe',
        asanagId: '98765',
      },
      {
        name: 'Sally Smith',
        asanagId: '44444',
      },
    ])
      .then((users: Project[]) => {
        logger.debug(`Created ${users.length} Projects`);
        return;
      })
      .catch((error: Error) => throwError(error, 'Error creating Projects'));
  },

  down: async () => {
    Project.destroy({ truncate: true })
      .then(() => logger.debug(`Destroyed Projects`))
      .catch((error: Error) => throwError(error, 'Error destroying Projects'));
  },
};
