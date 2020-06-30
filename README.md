# TRIM SlackBot Starter

A Node Server written in Typescript and designed to get you quickly building Slackbots with Botkit + the [Slack adapter](https://botkit.ai/docs/v4/platforms/slack.html).

## Prerequisites

- [TypeScript](https://www.typescriptlang.org/index.html)
- [Install Node and NPM](https://nodejs.org/en/)
- [Node Version Manager](https://github.com/nvm-sh/nvm) (this project uses Node version 12.6.0)
- [Ngrok](https://ngrok.com/)

1. Set up A URL for the OAuth redirect you will need once your slack wprkspace and app are set up
    - [ngrok](ngrok.com) is helpful for this

2. Rename `example.env` to `.env`

3. Set Up Slack:
    - Configure a new Slack App inside the [Slack Developer Portal](http://api.slack.com/apps). [Source](https://botkit.ai/docs/v4/provisioning/slack-events-api.html)
        - Slack Client Secret
        - Slack Client ID
        - OAuth Redirect Url
        - Interactivity Request URL
        - Subscribe to Event Subscriptions
          - message.channels
          - message.groups
          - message.im
          - message.mpim
    - Add your bot to your Slack team
        [ ] visit [https://BOT_URL/install](https://BOT_URL/install)

4. `$ nvm install 14.1.0 && nvm use 14.1.0`

## Quick Start

After cloning the project, in your terminal:

1. Install dependencies `$ yarn install`

2. `$ dc up`.  This builds and starts the containers for development.

3. This app is set up for TDD. To begin, Start the test suite:
    - `$ yarn test:watch`
    *This will re-run the test suite after every save and produce a coverage report*

4. You can also run `yarn dev` to develop with hot reloading.

5. Tunnel localhost:4000 with `ngrok http --subdomain=sprint-bot 4000` or `ngrok http --subdomain=alt-bot 4000`

6. Read the "GOTCHAS" at the bottom of this file

- TRIM will test 100% of Conversations with an integration test
  - Integrations tests that focus on testing the **final result** of a conversation (and different scenarios related to a final result)
      *Example: Booking a meeting*
        - When a user provides all the details for their meeting, the bot responds with the booking confirmation and creates the meeting. (Happy Path)
        - If a user provides bad data in a conversation (mixed up meeting times that don’t make sense, etc.), the bot responds with the relevant message.
        - When a user has an error from a 3rd Party API (NOT Slack) over the course of the conversation, the bot responds with a general error message.

        *NOTE: Be careful and avoid testing the conversation's many possible variations/flow within an integration test.  Use a unit test to test the various possibilities instead.*

- To test persisted objects this reposotory uses a [Jest preset](https://github.com/shelfio/jest-mongodb) for [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server).  This preset sets the process.env.MONGO_URL for your convenience.

- To ignore a directory or file in the coverage report, add the appropriate regex/path to the `coveragePathIgnorePatterns` array in `jest.config.js`. [More Here.](https://jestjs.io/docs/en/configuration#coveragepathignorepatterns-arraystring)

## Sequelize

This repository utilizes the [Sequelize ORM](https://sequelize.org/master/index.html).

-Sequelize-cli has poor support for typescript so we will not be using it.  in `db/` we have set up a seeders folder for creating instances of models.  To alter the database we will be utilizing the `.sync()` method.  More on how to manage db changes [here](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-sync).

## Bot Development

See all the Slack apps and configurations that you have access to here: [https://api.slack.com/apps](https://api.slack.com/apps)

## Gotchas

1. This repo has a pre-push hook that prevents you from pushing your code if `yarn build` fails.   **You MUST have the docker container running in order to push**