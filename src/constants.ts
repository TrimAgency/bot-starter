import * as dotenv from 'dotenv';

// Attach .env variables to process.env
const env = process.env.NODE_ENV;
if (env !== 'production') {
  dotenv.config();
}

// Mongo
export const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@bot-db:27017/?authSource=admin`;

// Redis
export const REDIS_CONNECTION = process.env.REDIS_URL || '';

/*********
 SLACK
 **********/

// Slack Webhook
export const SLACK_WEBHOOK = `/api/messages`;

// SlackBot Scopes
export const BOT_SCOPE_LIST = [
  'channels:history',
  'channels:join',
  'channels:manage',
  'channels:read',
  'chat:write',
  'chat:write.customize',
  'chat:write.public',
  'commands',
  'groups:history',
  'groups:read',
  'groups:write',
  'im:history',
  'im:read',
  'im:write',
  'incoming-webhook',
  'mpim:history',
  'mpim:read',
  'mpim:write',
  'team:read',
  'usergroups:read',
  'usergroups:write',
  'users.profile:read',
  'users:read',
  'users:read.email',
  'users:write',
];
