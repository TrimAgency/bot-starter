# TRIM SlackBot Starter

A Node Server written in Typescript and designed to get you quickly building Slackbots with Botkit + the [Slack adapter](https://botkit.ai/docs/v4/platforms/slack.html).

## Prerequisites

1. Set up A URL for the OAuth redirect you will need once your slack wprkspace and app are set up
    - [ngrok](ngrok.com) is helpful for this

2. Rename `example.env` to `.env`

3. Set Up Slack

    - In order to get everything set up, you will need to configure a new Slack App inside the [Slack Developer Portal](http://api.slack.com/apps). [Source](https://botkit.ai/docs/v4/provisioning/slack-events-api.html)
    [ ] Slack Client Secret
    [ ] Slack Client ID
    [ ] OAuth Redirect Url
    [ ] Interactivity Request URL
    [ ] Subscribe to Event Subscriptions
        [ ] message.channels
        [ ] message.groups
        [ ] message.im
        [ ] message.mpim
    [ ] Add your bot to your Slack team
        [ ] visit [https://BOT_URL/install](https://BOT_URL/install)

4. [Node Version Manager](https://github.com/nvm-sh/nvm) and version 14.1.0

## Quick Start

After cloning the project, in your terminal:

1. Install dependencies `$ yarn install`

2. `$ dc up`.  This builds and starts the containers for development.

3. This app is set up for TDD. To begin, access the server's (node app's) command line:
    - `$ docker exec -it server bash`

4. Start the test suite:
    - `$ yarn test:watch`
    *This will re-run the test suite after every save and produce a coverage report*

## Testing

- The test framework is [Jest](https://jestjs.io/docs/en/getting-started.html).
- Code Coverage Goal is to test 80% of functions with unit tests.  You can adjust the coverage report in `jest.config.js`
- TRIM will test 100% of Conversations with an integration test
  - Integrations tests that focus on testing the **final result** of a conversation (and different scenarios related to a final result)
    - *Example: Booking a meeting*
      - When a user provides all the details for their meeting, the bot responds with the booking confirmation and creates the meeting. (Happy Path)
      - If a user provides bad data in a conversation (mixed up meeting times that don’t make sense, etc.), the bot responds with the relevant message.
      - When a user has an error from a 3rd Party API (NOT Slack) over the course of the conversation, the bot responds with a general error message.

        *NOTE: Be careful and avoid testing the conversation's many possible variations/flow within an integration test.  Use a unit test to test the various possibilities instead.*
- To ignore a directory or file in the coverage report, add the appropriate regex/path to the `coveragePathIgnorePatterns` array in `jest.config.js`.  [More Here.](https://jestjs.io/docs/en/configuration#coveragepathignorepatterns-arraystring)

- To test persisted objects this reposotory uses a [Jest preset](https://github.com/shelfio/jest-mongodb) for [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server).  This preset sets the process.env.MONGO_URL for your convenience.  FYI, This preset will initiate a download of mongo when you first run your test suite.  Subsequent iterations will not do this.

## Adding Libraries

1. `$ docker exec -it bot-server bash`
2. Install using yarn:
    - `> yarn add <lib>`
3. `> exit`
4. `$ docker-compose down`
5. `$ docker-compose up --build`
