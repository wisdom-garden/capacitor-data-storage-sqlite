#!/usr/bin/env node

const OSS = require("ali-oss");

const [file, remote] = process.argv.slice(2);
if (!file || !remote) {
  console.error("Usage: node scripts/oss-upload.js <local-file> <remote-path>");
  process.exit(1);
}

const client = new OSS({
  region: process.env.OSS_REGION,
  bucket: process.env.OSS_BUCKET,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
});

client
  .put(remote, file)
  .then(() => {
    console.log(
      `Upload success: https://${process.env.OSS_BUCKET}.${process.env.OSS_REGION}.aliyuncs.com/${remote}`
    );
  })
  .catch((err) => {
    console.error("Upload failed:", err.message);
    process.exit(1);
  });
