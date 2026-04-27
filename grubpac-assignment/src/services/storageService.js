const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
const path = require('path');

class StorageService {
  constructor() {
    this.useS3 = !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
    
    if (this.useS3) {
      this.s3Client = new S3Client({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
      this.bucketName = process.env.AWS_S3_BUCKET;
    }
  }

  async uploadFile(file) {
    if (!this.useS3) {
      // Fallback to local storage path (already handled by Multer)
      return `/uploads/${file.filename}`;
    }

    try {
      const fileStream = fs.createReadStream(file.path);
      const fileName = `${Date.now()}-${file.originalname}`;
      
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: `contents/${fileName}`,
          Body: fileStream,
          ContentType: file.mimetype,
        },
      });

      await upload.done();
      
      // Delete local file after upload
      fs.unlinkSync(file.path);
      
      return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/contents/${fileName}`;
    } catch (error) {
      console.error('S3 Upload Error:', error);
      // Fallback to local if S3 fails
      return `/uploads/${file.filename}`;
    }
  }
}

module.exports = new StorageService();
