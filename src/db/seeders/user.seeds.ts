import { User } from '../models/user.model';
import { logger } from '../../server';
import { throwError } from '../../errors/throw-error';

export const UserSeeds = {
  up: async () => {
    User.bulkCreate([
      {
        name: 'John Doe',
        slackId: '98765',
      },
      {
        name: 'Sally Smith',
        slackId: '44444',
      },
    ])
      .then((users: User[]) => {
        logger.debug(`Created ${users.length} Users`);
        return;
      })
      .catch((error: Error) => throwError(error, 'Error creating Users'));
  },

  down: async () => {
    User.destroy({ truncate: true })
      .then(() => logger.debug(`Destroyed Users`))
      .catch((error: Error) => throwError(error, 'Error destroying Users'));
  },
};
