const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('./zoos/zoos-router');

// const router = require('express').Router();

// const knex = require('knex');

// const knexConfig = {
//   client: "sqlite3",
//   useNullAsDefault: true,
//   connection: {
//     filename: "./data/lambda.sqlite3"
//   },
// };

// const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zoosRouter);

// endpoints here

// router.get("/", (req, res) => {
//   // db('zoos').then(zoos => {
//   //   res.status(200).json(zoos)
//   // }).catch(error => {
//   //   res.status(500).json(error);
//   // });
//   res.send('get alls zoos data here');
// });

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
