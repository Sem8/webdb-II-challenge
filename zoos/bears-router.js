const bearsRouter = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "./data/lambda.sqlite3"
    },
};

const bearsdb = knex(knexConfig);

bearsRouter.get("/", (req, res) => {
    bearsdb('bears').then(bears => {
        res.status(200).json(bears)
    }).catch(error => {
        res.status(500).json({ message: `The bears information could not be retrieved: ${error}`});
    });
});

module.exports = bearsRouter;