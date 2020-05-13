import { configSlackBotAdapter } from './adapter';
import { initSlackController } from './controller';

export const initSlackBot = async () => {
  const adapter = await configSlackBotAdapter();
  initSlackController(adapter);
};
