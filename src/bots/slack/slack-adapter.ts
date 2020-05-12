import {
  SlackAdapter,
  SlackEventMiddleware,
  SlackMessageTypeMiddleware,
} from 'botbuilder-adapter-slack';

let tokenCache: any = {};
let userCache: any = {};

async function getTokenForTeam(teamId: string): Promise<any> {
  if (tokenCache[teamId]) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(tokenCache[teamId]);
      }, 150);
    });
  } else {
    console.error('Team not found in tokenCache: ', teamId);
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(null);
      }, 150);
    });
  }
}

async function getBotUserByTeam(teamId: string): Promise<any> {
  if (userCache[teamId]) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(userCache[teamId]);
      }, 150);
    });
  } else {
    console.error('Team not found in userCache: ', teamId);
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(null);
      }, 150);
    });
  }
}
export const configSlackBotAdapter = async () => {
  // A BotKit configuration
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
    getTokenForTeam,
    getBotUserByTeam,
  });

  // Use SlackEventMiddleware to emit events that match their original Slack event types.
  slackAdapter.use(new SlackEventMiddleware());

  // Use SlackMessageType middleware to further classify messages as direct_message,
  // direct_mention, or mention
  slackAdapter.use(new SlackMessageTypeMiddleware());
  return slackAdapter;
};
