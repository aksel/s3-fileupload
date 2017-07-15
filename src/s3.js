const AWS = require('aws-sdk');

// Make sure to specify your bucket name in the package.json
const BUCKET = process.env.BUCKET;

// Also make sure your access keys are filled out.
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const upload = (buffer, filename) => new Promise((resolve, reject) => {
  s3.putObject({ Bucket: BUCKET, Body: buffer, Key: filename, ACL: 'public-read' }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(`https://s3.amazonaws.com/${BUCKET}/${filename}`)
    }
  });
});

module.exports.upload = upload;
