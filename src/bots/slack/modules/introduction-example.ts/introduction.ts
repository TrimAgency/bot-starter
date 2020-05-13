import { Botkit, BotkitMessage, BotkitConversation } from 'botkit';
import { SlackBotWorker } from 'botbuilder-adapter-slack';
// Threads
import { nameThread } from './threads/name.thread';
import { favColorThread, FAVORITE_COLOR_THREAD } from './threads/color.thread';
import {
  COLOR_CONFIRMATION_THREAD,
  colorConfirmationThread,
} from './threads/color-confirmation.thread';

const INTRODUCTION_DIALOG_ID = 'intro-convo';

export async function introductionDialog(controller: Botkit) {
  //   Trigger the Dialog
  controller.hears(
    ['^convo', '^intro'],
    'direct_message, direct_mention',
    async (bot: SlackBotWorker, message: BotkitMessage) => {
      let convo: BotkitConversation = new BotkitConversation(
        INTRODUCTION_DIALOG_ID,
        controller
      );

      // send a greeting
      convo.say('Hola!');

      // ask a question, store the response in 'name'
      nameThread(convo);

      // use add action to switch to a different thread, defined below...
      convo.addAction(FAVORITE_COLOR_THREAD);

      // add a message and a prompt to a new thread called `favorite_color`
      convo.addMessage('Awesome {{vars.name}}!', FAVORITE_COLOR_THREAD);

      // ask a question, store the response in 'color'
      favColorThread(convo);

      // go to a Confirmation Thread
      convo.addAction(COLOR_CONFIRMATION_THREAD, FAVORITE_COLOR_THREAD);

      // Ask for a simple confirmation of the user's color choice.
      //   Redirect to FAVORITE_COLOR_THREAD if the sotred value is incorrect
      colorConfirmationThread(convo);

      //   Adds Dialog to the controller
      controller.addDialog(convo);
      await bot.beginDialog(INTRODUCTION_DIALOG_ID);
    }
  );
}
