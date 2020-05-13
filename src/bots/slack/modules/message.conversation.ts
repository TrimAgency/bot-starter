import { SlackBotWorker } from 'botbuilder-adapter-slack';
import { BotkitMessage, Botkit } from 'botkit';

export const onMessageConversation = async (controller: Botkit) => {
  controller.on(
    'message',
    async (bot: SlackBotWorker, message: BotkitMessage) => {
      await bot.reply(message, 'I heard a message!');
    }
  );
};
