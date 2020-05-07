# TRIM SlackBot Starter
<!-- TODO:
[] Look at Filing system for member bot
[] Questions are easier all in one area
[] member bot for examples of convo's
 -->

## Getting Started

1. After cloning the project, in your terminal: `dc up`

## Prerequisites

1. Set up A URL for the OAuth redirect you will need once your slack wprkspace and app are set up
    - [ngrok](ngrok.com) is helpful for this

2. Set Up Slack

    - In order to get everything set up, you will need to configure a new Slack App inside the [Slack Developer Portal](http://api.slack.com/apps). Source: https://botkit.ai/docs/v4/provisioning/slack-events-api.html
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
        [ ] visit https://BOT_URL/install


## Development

This app is set up for TDD.

1. Once the dev server is running, in your terminal (using the appropriate NODE version) run:
    - `$ yarn test:watch`
    This will re-run the test suite after every save and produce a coverage report

## Testing

- The test framework is [Jest](https://jestjs.io/docs/en/getting-started.html).
- Code Coverage Goal is to test 80% of functions with unit tests.  You can adjust the coverage report in `jest.config.js`
- TRIM will test 100% of Conversations with an integration test
  - Integrations tests that focus on testing the **final result** of a conversation (and different scenarios related to a final result)
      *Example: Booking a meeting*
        - When a user provides all the details for their meeting, the bot responds with the booking confirmation and creates the meeting. (Happy Path)
        - If a user provides bad data in a conversation (mixed up meeting times that don’t make sense, etc.), the bot responds with the relevant message.
        - When a user has an error from a 3rd Party API (NOT Slack) over the course of the conversation, the bot responds with a general error message.

        *NOTE: Be careful and avoid testing the conversation's many possible variations/flow within an integration test.  Use a unit test to test the various possibilities instead.*