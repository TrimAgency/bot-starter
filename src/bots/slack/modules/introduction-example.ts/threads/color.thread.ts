import { BotkitConversation, BotkitDialogWrapper, BotkitMessage } from 'botkit';
import { SlackBotWorker } from 'botbuilder-adapter-slack';

export const FAVORITE_COLOR_THREAD = 'favorite_color';

export const favColorThread = (convo: BotkitConversation) => {
  // ask a question, store the response in 'color'
  convo.addQuestion(
    'Now, what is your favorite color?',
    async (
      response: string,
      convo: BotkitDialogWrapper,
      bot: SlackBotWorker,
      full_message: BotkitMessage
    ) => {
      console.log(`user favorite color is ${response}`);
    },
    'color',
    'favorite_color'
  );
};
