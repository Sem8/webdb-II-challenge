const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/lambda.sqlite3"
    },
  };
  
  const zoosdb = knex(knexConfig);

  router.get("/", (req, res) => {
    zoosdb('zoos').then(zoos => {
    res.status(200).json(zoos)
  }).catch(error => {
    res.status(500).json({message: `The zoos information could not be retrieved: ${error}`});
  });
//   res.send('get alls zoos data here');
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    zoosdb('zoos')
    .where({ id })
    .first()
    .then(zoo => {
        res.status(200).json(zoo);
    })
    .catch(error => {
        res.status(500).json({ message: `Error occurred while retrieving zoo: ${error}`});
    })
})

router.post("/", (req, res) => {
    zoosdb('zoos').insert(req.body).then(ids => {
        const id = ids[0];
        zoosdb('zoos')
        .where({ id })
        .first()
        .then(zoo => {
            res.status(201).json(zoo);
        });
    }).catch(error => {
        res.status(500).json({message: `A new zoo couldn't be made: ${error}`});
    });
});

router.put("/:id", (req, res) => {
    zoosdb('zoos').where({ id: req.params.id }).update(req.body).then(count => {
        if(count > 0) {
            res.status(200).json(count);
        } else {
            res.status(404).json({ message: "Zoo does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: `Error occurred while updating zoo: ${error}`});
    });
});

router.delete("/:id", (req, res) => {
    zoosdb('zoos').where({ id: req.params.id}).del().then(count => {
        if(count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Zoo does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: `Error occurred while deleting zoo: ${error}`});
    });
});



module.exports = router;