import { Botkit, BotkitMessage } from 'botkit';
import { configSlackBotAdapter } from '../slack-adapter';
import {
  SlackBotWorker,
  SlackDialog,
  SlackAdapter,
  SlackEventMiddleware,
  SlackMessageTypeMiddleware,
} from 'botbuilder-adapter-slack';
import { Response, Request } from 'express';

import { MONGO_URI } from '../../../constants';

const { MongoDbStorage } = require('botbuilder-storage-mongodb');

let storage: any = null;

storage = new MongoDbStorage({
  url: MONGO_URI,
});

const slackAdapter: SlackAdapter = new SlackAdapter({
  // auth token for a single-team app
  botToken: process.env.SLACK_BOT_TOKEN,

  // parameters used to secure webhook endpoint
  verificationToken: process.env.SLACK_BOT_VERIFICATION_TOKEN,
  clientSigningSecret: process.env.SLACK_CLIENT_SIGNING_SECRET,

  // credentials used to set up oauth for multi-team apps
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  scopes: ['bot'],
  redirectUri: process.env.SLACK_BOT_REDIRECT_URI,
  // getTokenForTeam,
  // getBotUserByTeam,
});

// Use SlackEventMiddleware to emit events that match their original Slack event types.
slackAdapter.use(new SlackEventMiddleware());

// Use SlackMessageType middleware to further classify messages as direct_message,
// direct_mention, or mention
slackAdapter.use(new SlackMessageTypeMiddleware());

export const controller = new Botkit({
  adapter: slackAdapter,
  webhook_uri: '/api/messages',
  storage,
  // ...other options
});

export const configSlackBotController = (controller: Botkit) => {
  controller.ready(async () => {
    const team = process.env.SLACK_BOT_TEAM_ID || 'example-team';
    const channel = process.env.SLACK_BOT_DEFAULT_CHANNEL || 'general';

    console.log('channel', channel);
    const userId = process.env.SLACK_BOT_USER_ID || 'UACTM8B4K';

    // let bot = await controller.spawn(team);
    // try {
    //   // await bot.startConversationInChannel(channel, userId);
    // await bot.startPrivateConversation(userId);
    // bot.say('I AM AWOKEN.');
    // } catch (error) {
    // console.log('Error starting worker error', error);
    // }

    controller.on('message', async (bot, message) => {
      await bot.reply(message, 'I heard a message!');
    });

    /*
    Example Functions
    */

    controller.on(
      'direct_message',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        console.log('message', message);
        await bot.reply(message, 'I heard a private message');
      }
    );

    controller.hears(
      'dm me',
      'message',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.startPrivateConversation(message.user);
        await bot.say(`Let's talk in private.`);
      }
    );

    controller.on(
      'direct_mention',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.reply(
          message,
          `I heard a direct mention that said "${message.text}"`
        );
      }
    );

    controller.on(
      'mention',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.reply(
          message,
          `You mentioned me when you said "${message.text}"`
        );
      }
    );

    controller.hears(
      'ephemeral',
      'message,direct_message',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.replyEphemeral(
          message,
          'This is an ephemeral reply sent using bot.replyEphemeral()!'
        );
      }
    );

    controller.hears(
      'threaded',
      'message,direct_message',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.replyInThread(message, 'This is a reply in a thread!');

        await bot.startConversationInThread(
          message.channel,
          message.user,
          message.incoming_message.channelData.ts
        );
        await bot.say('And this should also be in that thread!');
      }
    );

    controller.hears(
      'blocks',
      'message',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.reply(message, {
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text:
                  "Hello, Assistant to the Regional Manager Dwight! *Michael Scott* wants to know where you'd like to take the Paper Company investors to dinner tonight.\n\n *Please select a restaurant:*",
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text:
                  '*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here',
              },
              accessory: {
                type: 'image',
                image_url:
                  'https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg',
                alt_text: 'alt text for image',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text:
                  '*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft.',
              },
              accessory: {
                type: 'image',
                image_url:
                  'https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg',
                alt_text: 'alt text for image',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text:
                  '*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder.',
              },
              accessory: {
                type: 'image',
                image_url:
                  'https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg',
                alt_text: 'alt text for image',
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Farmhouse',
                    emoji: true,
                  },
                  value: 'Farmhouse',
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Kin Khao',
                    emoji: true,
                  },
                  value: 'Kin Khao',
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Ler Ros',
                    emoji: true,
                  },
                  value: 'Ler Ros',
                },
              ],
            },
          ],
        });
      }
    );

    controller.on(
      'block_actions',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.reply(
          message,
          `Sounds like your choice is ${message.incoming_message.channelData.actions[0].value}`
        );
      }
    );

    controller.on(
      'slash_command',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        if (message.text === 'plain') {
          await bot.reply(message, 'This is a plain reply');
        } else if (message.text === 'public') {
          await bot.replyPublic(message, 'This is a public reply');
        } else if (message.text === 'private') {
          await bot.replyPrivate(message, 'This is a private reply');
        }

        // set http status
        bot.httpBody({
          text: 'You can send an immediate response using bot.httpBody()',
        });
      }
    );

    controller.on(
      'interactive_message',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        console.log('INTERACTIVE MESSAGE', message);

        switch (message.actions[0].name) {
          case 'replace':
            await bot.replyInteractive(
              message,
              '[ A previous message was successfully replaced with this less exciting one. ]'
            );
            break;
          case 'dialog':
            await bot.replyWithDialog(
              message,
              new SlackDialog('this is a dialog', '123', 'Submit', [
                {
                  type: 'text',
                  label: 'Field 1',
                  name: 'field1',
                },
                {
                  type: 'text',
                  label: 'Field 2',
                  name: 'field2',
                },
              ])
                .notifyOnCancel(true)
                .state('foo')
                .asObject()
            );
            break;
          default:
            await bot.reply(message, 'Got a button click!');
        }
      }
    );

    controller.on(
      'dialog_submission',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.reply(message, 'Got a dialog submission');

        // Return an error to Slack
        bot.dialogError([
          {
            name: 'field1',
            error: 'there was an error in field1',
          },
        ]);
      }
    );

    controller.on(
      'dialog_cancellation',
      async (bot: SlackBotWorker, message: BotkitMessage) => {
        await bot.reply(message, 'Got a dialog cancellation');
      }
    );
  });

  controller.webserver.get('/', (res: Response) => {
    res.send(`This app is running Botkit ${controller.version}.`);
  });

  controller.webserver.get(
    '/install/auth',
    async (req: Request, res: Response) => {
      try {
        const results = await controller.adapter.validateOauthCode(
          req.query.code
        );

        console.log('FULL OAUTH DETAILS', results);

        // Store token by team in bot state.
        storage.write({
          [results.team_id]: {
            bot_access_token: results.bot.bot_access_token,
            bot_user_id: results.bot.bot_user_id,
          },
        });

        res.json('Success! Bot installed.');
      } catch (err) {
        console.error('OAUTH ERROR:', err);
        res.status(401);
        res.send(err.message);
      }
    }
  );
};