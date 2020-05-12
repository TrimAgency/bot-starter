import { SlackBotWorker } from 'botbuilder-adapter-slack';
import { BotkitMessage } from 'botkit';
import { controller } from '../controllers/slack-message.controller';

export const onMessage = async (
  bot: SlackBotWorker,
  message: BotkitMessage
) => {
  await bot.reply(message, 'I heard a message!');
};
