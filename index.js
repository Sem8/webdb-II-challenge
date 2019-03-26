const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('./zoos/zoos-router');
const bearsRouter = require('./zoos/bears-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send(
    `Navigate to /api/zoos on the URL to get all zoos \n Navigate to /api/bears to get all bears data`
  );
});

server.use('/api/zoos', zoosRouter);
server.use('/api/bears', bearsRouter);


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
