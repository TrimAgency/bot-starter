// Mongo
export const MONGO_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@bot-db:27017/?authSource=admin`;

// Slack Webhook
export const SLACK_WEBHOOK = `/api/messages`;
