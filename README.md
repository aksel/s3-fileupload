# S3 Fileupload example

## Example Node.js service for handling uploads to S3, with Express and multer.

### Usage

#### Clone repo
`git clone https://github.com/aksel/s3-fileupload.git`

#### [Create S3 bucket](https://console.aws.amazon.com/s3/)

#### [Create IAM user with S3 read and write privileges](https://console.aws.amazon.com/iam/)

#### Download CSV of access key and secret access key.

Under the tab 'Security credentials', you can find the user's access keys.

#### Update package.json with your bucket and access keys.
As an example

```
"scripts": {
  "start": "cross-env NODE_ENV=development BUCKET=some_fileupload_bucket ACCESS_KEY_ID=accessKey123421 SECRET_ACCESS_KEY=secretKey21390321 node ./src/server.js"
}
```

#### Start service, and POST to http://localhost:5000/