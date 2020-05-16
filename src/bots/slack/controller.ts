import { SlackAdapter } from 'botbuilder-adapter-slack';
import { Botkit } from 'botkit';

import { storage } from './storage';
import { SLACK_WEBHOOK } from '../../constants';
import { app } from '../../server';
// Conversations
import { debugConversation } from './modules/debug/debug.conversation';
import { introductionDialog } from './modules/introduction-example.ts/introduction';
import { slashCommandExample } from './modules/slash-command-example.ts/slash-command';

export const initSlackController = (adapter: SlackAdapter) => {
  const controller = new Botkit({
    dialogStateProperty: `botbuilder-adapter-slack`,
    adapter,
    webhook_uri: SLACK_WEBHOOK,
    storage,
    webserver: app,
    // ...other options
  });

  controller.ready(async () => {
    // Generic response to all messages in the Bot's Channel [enable to debug]
    // debugConversation(controller);

    // Example that asks a user their name and favorite color
    introductionDialog(controller);

    // Example for handling a Slash Command
    slashCommandExample(controller);
    console.log('*****\nSlackbot Modules Loaded!\n*****');
  });
};
