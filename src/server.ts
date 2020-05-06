import * as express from 'express';

const app = express();

app.listen(4000, () => {
  console.log(`*****\nSlackBot Server started on port: ${4000}\n******`);
});
