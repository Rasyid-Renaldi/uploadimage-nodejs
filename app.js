const express = require('express');
const cors = require('cors');
const app = express();

global.__basedir = __dirname;

var _cors = {
  origin: 'http://localhost:3000',
};

app.use(cors(_cors));

const _appRoutes = require('./routes/img-upload.route');

app.use(
  express.urlencoded({
    extended: true,
  })
);

_appRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App working on: ' + port);
});

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error('Server Error!'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 404;
  res.status(err.statusCode).send(err.message);
});
