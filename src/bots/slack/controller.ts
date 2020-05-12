import { SlackAdapter, SlackBotWorker } from 'botbuilder-adapter-slack';
import { Botkit, BotkitMessage } from 'botkit';
import { Response, Request } from 'express';
import { storage } from './storage';
import { SLACK_WEBHOOK } from '../../constants';
// Conversations
import { onMessageConversation } from './modules/message.conversation';

export const initSlackController = (adapter: SlackAdapter) => {
  const controller = new Botkit({
    adapter,
    webhook_uri: SLACK_WEBHOOK,
    storage,
    // ...other options
  });

  controller.ready(async () => {
    // Generic message response
    onMessageConversation(controller);

    // On DM example
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

    // Unsure if this is working
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

  controller.webserver.get('/', ({ res }: { res: Response }) => {
    res.send(`This app is running Botkit ${controller.version}.`);
  });

  controller.webserver.get(
    '/install/auth',
    async (req: Request, res: Response) => {
      console.log('req', req);
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
