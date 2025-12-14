import { S3 as AwsS3 } from "aws-sdk";
import RNFS from "react-native-fs";
import { Buffer } from "buffer";

import S3Config from "@/awsS3.config.js";
import awsS3Config from "@/awsS3.config.js";

export const S3 = new AwsS3({
  accessKeyId: S3Config.accessKeyID,
  secretAccessKey: S3Config.secretAccessKey,
  region: S3Config.region,
});

export const uploadImage = async (url: string, name: string) => {
  try {
    const fileData = await RNFS.readFile(url, "base64");

    const formData = Buffer.from(fileData, "base64");

    const imageName = name + "image.jpg";

    const params = {
      Bucket: awsS3Config.bucket,
      Key: imageName,
      Body: formData,
      ContentType: "image/jpeg",
    };

    const image = S3.upload(params);

    const promise = await image.promise();

    const { Location } = promise;

    return Location;
  } catch (error) {
    console.log("이미지 업로드에 실패했습니다.", error);
  }
};
