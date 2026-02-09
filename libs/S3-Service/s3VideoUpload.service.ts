// s3.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class S3VideoService {
  private readonly s3: S3Client
  private readonly bucket: string

  constructor(private readonly configService: ConfigService) {
    const s3Config = this.configService.get().S3_bucket;

    if (
      !s3Config.access_key_id ||
      !s3Config.secret_access_key ||
      !s3Config.region ||
      !s3Config.bucket_name
    ) {
      throw new Error("S3 credentials missing in env!");
    }

    console.log("S3 creds loaded:", {
      key: s3Config.access_key_id,
      secret: s3Config.secret_access_key ? "****" : "MISSING",
      region: s3Config.region,
      bucket: s3Config.bucket_name
    });

    this.s3 = new S3Client({
      region: s3Config.region,
      credentials: {
        accessKeyId: s3Config.access_key_id,
        secretAccessKey: s3Config.secret_access_key,
      },
    });

    this.bucket = s3Config.bucket_name;
  }

  async getPresignedUrl(opts: {
    userId: string;
    contentType: string;  // e.g. "video/mp4"
    extension: string;    // e.g. "mp4"
  }) {
    const key = `uploads/videos/${Date.now()}-${randomUUID()}.${opts.extension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: opts.contentType,
      ServerSideEncryption: 'AES256', // optional
    });

    // URL valid for 5 minutes (300 sec)
    const url = await getSignedUrl(this.s3, command, { expiresIn: 600 });

    // console.log("url : ",url,key)

    return { url, key };
  }
}
