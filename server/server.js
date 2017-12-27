import express from 'express';
import config from './config';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import api from './api';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('server!');
})

app.use('/api', api);

app.use(errorHandler)

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  console.error(err);
  res.status(500).send(err)
}

const server = app.listen(config.PORT, () => {
  console.log(`App is listening on port ${server.address().port}...`);
});