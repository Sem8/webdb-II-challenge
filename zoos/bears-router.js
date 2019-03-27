const bearsRouter = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const bearsdb = knex(knexConfig);

bearsRouter.get("/", (req, res) => {
  bearsdb("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `The bears information could not be retrieved: ${error}`
        });
    });
});

bearsRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  bearsdb("bears")
    .where({ id })
    .first()
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(error => {
      res.status.json({
        message: `Error occurred while retrieving bear: ${error}`
      });
    });
});

bearsRouter.post("/", (req, res) => {
  bearsdb("bears")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      bearsdb("bears")
        .where({ id })
        .first()
        .then(bear => {
          res.status(201).json(bear);
        });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `A new bear couldn't be made: ${error}` });
    });
});

bearsRouter.put("/:id", (req, res) => {
  bearsdb("bears")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Bear does not exist" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Error occurred while updating bear: ${error}` });
    });
});

bearsRouter.delete("/:id", (req, res) => {
  bearsdb("bears")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `bear does not exist` });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Error occurred while deleting bear: ${error}` });
    });
});

module.exports = bearsRouter;
