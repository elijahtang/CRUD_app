const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
// const db = require('./models/toDoDb');
const controllers = require('./controllers/controllers');

app.use(express.json()); // handle parsing request body

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../dist'))); 

// setup back end routes for get and post
// server sends the list back to client
app.get('/list', controllers.getList, (req, res) => {
  console.log('in get list line 18');
  res.status(200).json(res.locals.list);
});

// client add a task to the list and server saves it to the database
app.post('/list', controllers.insert, (req, res) => {
  console.log('in insert list line 24');
  res.status(200).json(res.locals.list);
  // without .json(res.locals.list), 
  // postman post request to /list never stops
});

app.delete('/list/:id', controllers.delete, (req, res) => {
    return res.status(200)
})


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
    res.status(404).send('page not found');
  });  

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error ' + err.message,
    status: 500,
    message: { err: 'An error occurred in global error handler' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT} at http://localhost:${PORT}`);
})

module.exports = app; //what is this for? copied from unit 9-express 