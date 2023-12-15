import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  public readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION || 'AWS_REGION',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || 'AWS_ACCESS_KEY',
        secretAccessKey:
          process.env.AWS_SECRET_ACCESS_KEY || 'AWS_SECRET_ACCESS_KEY',
      },
    });
  }

  async uploadFileToS3(
    file: Blob,
    name: string,
    mimetype: string,
  ): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const params = {
      Bucket: process.env.S3_BUCKET_NAME || 'S3_BUCKET_NAME',
      Key: `${name}`,
      Body: buffer,
      ContentType: mimetype,
    };
    await this.s3.upload(params).promise();

    return params.Key;
  }

  async generatePresignedUrlForFile(
    fileKey: string,
    expirationTimeInSeconds: number,
  ): Promise<string> {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME || 'S3_BUCKET_NAME',
      Key: fileKey,
      Expires: expirationTimeInSeconds,
    };

    const url = await this.s3.getSignedUrlPromise('getObject', params);

    return url;
  }
}
