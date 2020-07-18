const express = require('express');
const projectsRouter = require('./projects/projectsRouter.js');
const actionsRouter = require('./actions/actionsRouter.js');
const middleware = require('./middleware.js');

const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(middleware.logger);
server.use('/api/projects/', projectsRouter);
server.use('/api/actions/', actionsRouter);

server.get('/', (req, res, next) => {
  const messageOfTheDay = process.env.MOTD || 'Sup Cutie';
  res.status(200).json({motd: messageOfTheDay});
  next();
});

module.exports = server;
