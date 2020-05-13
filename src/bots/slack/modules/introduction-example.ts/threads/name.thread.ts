import { BotkitConversation, BotkitDialogWrapper, BotkitMessage } from 'botkit';
import { SlackBotWorker } from 'botbuilder-adapter-slack';

export const NAME_THREAD = 'name';
export const nameThread = (convo: BotkitConversation) => {
  // ask a question, store the response in 'name'
  convo.ask(
    'What is your name?',
    async (
      response: string,
      convo: BotkitDialogWrapper,
      bot: SlackBotWorker,
      full_message: BotkitMessage
    ) => {
      console.log(`user name is ${response}`);
      // do something?
    },
    'name'
  );
};
