import { BotkitConversation, BotkitDialogWrapper, BotkitMessage } from 'botkit';
import { FAVORITE_COLOR_THREAD } from './color.thread';
import { SlackBotWorker } from 'botbuilder-adapter-slack';

export const COLOR_CONFIRMATION_THREAD = 'color-confirmation';

export const colorConfirmationThread = (convo: BotkitConversation) => {
  // do a simple confirmation of the user's color choice
  convo.addQuestion(
    'Your name is {{vars.name}} and your favorite color is {{vars.color}}. Is that right?',
    [
      {
        pattern: 'no',
        handler: async (
          response: string,
          convo: BotkitDialogWrapper,
          bot: SlackBotWorker,
          full_message: BotkitMessage
        ) => {
          // if user says no, go back to favorite color.
          await convo.gotoThread(FAVORITE_COLOR_THREAD);
        },
      },
      {
        default: true,
        handler: async (
          response: string,
          convo: BotkitDialogWrapper,
          bot: SlackBotWorker,
          full_message: BotkitMessage
        ) => {
          await bot.say('Awesome! Goodbye now!');
          // if you don't include an action here like bot.say or similar, nothing happens and convo completes
        },
      },
    ],
    'confirm',
    'color-confirmation'
  );
};
