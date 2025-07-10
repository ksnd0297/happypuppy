import { S3 as AwsS3 } from "aws-sdk";

import S3Config from "@/awsS3.config.js";

export const S3 = new AwsS3({
  accessKeyId: S3Config.accessKeyID,
  secretAccessKey: S3Config.secretAccessKey,
  region: S3Config.region,
});
