import { Botkit, BotkitMessage } from 'botkit';
import { SlackBotWorker } from 'botbuilder-adapter-slack';

// Slash Commands Also need to be configured at https://api.slack.com/apps/<your app>/slash-commands
export const slashCommandExample = async (controller: Botkit) => {
  controller.on(
    'slash_command',
    async (bot: SlackBotWorker, message: BotkitMessage) => {
      // the /<command> part
      let command = message.command;
      // the /command <parameters> part
      let parameter = message.text;

      await bot.replyPublic(message, 'My response to your command is: ...');
      await bot.replyPrivate(
        message,
        `....private, because you said "${parameter}"`
      );
    }
  );
};
