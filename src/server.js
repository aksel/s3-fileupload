const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/ping', (req, res) => res.send('hello world'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => res.sendStatus(err.status ? err.status : 500));

const server = app.listen(PORT);

const gracefulShutdown = () => {
  server.close(() => process.exit());
  setTimeout(() => process.exit(), 10000);
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
