const express = require('express');
const multer = require('multer');
const s3 = require('./s3');
const v4 = require('node-uuid').v4;

const PORT = process.env.PORT || 5000;
const MAX_FILE_SIZE = 10000000;
const MIME_TYPES = /image\/(png|jpg|jpeg|bmp)/;

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => cb(null, MIME_TYPES.test(file.mimetype)),
});

const verify = (req, res, next) => {
  if (req.file) {
    next();
  } else {
    next({ status: 400 });
  }
};

app.get('/ping', (req, res) => res.send('hello world'));

app.post('/', upload.single('image'), verify, (req, res, next) => {
  s3.upload(req.file.buffer, `${v4()}_${req.file.originalname}`)
    .then(url => res.send(url))
    .catch(next);
});

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
