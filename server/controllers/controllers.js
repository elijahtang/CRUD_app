const db = require('../models/toDoDb')

const controllers = {};

controllers.getList = (req, res, next) => {
  const queryString = `SELECT * FROM list`;
  console.log('before db query');
  db.query(queryString)
  .then(data => {
    res.locals.list = (data.rows);
    // res.send(res.locals.list);
    console.log('in db query then');
    next();
  })
  .catch(err => next({
    log: `In app.get list: ${err}`,
    status: 500,
    message: { err: 'An error occurred in app get list' },
  }));
}

controllers.insert = (req, res, next) => {
    const queryString = `INSERT INTO list (task, completed)
    VALUES ('${req.body.task}', 'no')`;
    db.query(queryString)
    .then(data => {
      next();
    })
    .catch(err => next({
        log: `In controllers.insert: ${err}`,
        status: 500,
        message: { err: 'An error occurred' },
      }));
  }

  controllers.delete = (req, res, next) => {
    const queryString = `DELETE FROM list where id = $1`
    db.query(queryString, [req.params.id])
    .then(data => {
      console.log('deleted task id: ', req.params.id );
      next();
    })
    .catch(err => next({
        log: `In controllers.delete: ${err}`,
        status: 500,
        message: { err: 'An error occurred' },
      }));
  }

module.exports = controllers;