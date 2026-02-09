import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'node:crypto';

@Injectable()
export class S3FileService {
    constructor(private readonly configService: ConfigService) {}

    async s3FileUpload(dataBuffer: Buffer, s3FilePath: string, originalName?: string) {
    try {
        const s3Config = this.configService.get().S3_bucket;
        console.log('Loaded S3 Config:', s3Config);

        if (!s3Config.access_key_id || !s3Config.secret_access_key || !s3Config.bucket_name || !s3Config.region) {
            throw new Error('Missing required S3 configuration!');
        }

        const s3 = new S3({
            region: s3Config.region,
            credentials: {
                accessKeyId: s3Config.access_key_id,
                secretAccessKey: s3Config.secret_access_key,
            },
            // Add timeout and retry configuration
            // maxRetries: 3,
            // retryDelayOptions: {
            //     customBackoff: function(retryCount) {
            //         return Math.pow(2, retryCount) * 100; // exponential backoff
            //     }
            // },
            // httpOptions: {
            //     timeout: 30000, // 30 seconds timeout
            //     connectTimeout: 10000, // 10 seconds connect timeout
            // }
        });

        // Get file extension to determine content type
        const fileExt = originalName?.split('.').pop()?.toLowerCase() || '';
        const contentTypes: Record<string, string> = {
           'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'pdf': 'application/pdf',
            'txt': 'text/plain',
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'json': 'application/json',
            'xml': 'application/xml',
            'csv': 'text/csv',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'zip': 'application/zip',
            'rar': 'application/x-rar-compressed',
            'mp3': 'audio/mpeg',
            'wav': 'audio/wav',
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'ogg': 'video/ogg'
            // Add more content types as needed
        };

        // Default to octet-stream if type is not recognized
        const contentType = contentTypes[fileExt] || 'application/octet-stream';

        // Upload the file with content type
        await s3.upload({
            Bucket: s3Config.bucket_name,
            Body: dataBuffer,
            Key: s3FilePath,
            ACL: 'private',
            ContentType: contentType,
            // Remove ContentDisposition from here
        }).promise();

        // Generate pre-signed URL with forced download disabled
//         const url = s3.getSignedUrl('getObject', {
//             Bucket: s3Config.bucket_name,
//             Key: s3FilePath,
//             Expires: 3600, // 1 hour
//             // Remove ResponseContentDisposition to allow browser to handle the file
//             ResponseContentType: contentType
//         });

//         console.log('S3 Upload successful. File URL:', url);
//         return url;

//     } catch (error) {
//         console.error('Error in s3 Upload function:', error);
//         throw error;
//     }
// }

const viewUrl = s3.getSignedUrl('getObject', {
            Bucket: s3Config.bucket_name,
            Key: s3FilePath,
            Expires: 3600, // 1 hour
            ResponseContentType: contentType
        });
        // Generate download URL (forces download)
        const downloadUrl = s3.getSignedUrl('getObject', {
            Bucket: s3Config.bucket_name,
            Key: s3FilePath,
            Expires: 3600, // 1 hour
            ResponseContentDisposition: `attachment; filename="${encodeURIComponent(originalName)}"`,
            ResponseContentType: contentType
        });
        console.log('S3 Upload successful');
        return {
            viewUrl,
            downloadUrl,
            filename: originalName,
            mimetype: contentType,
            size: dataBuffer.length
        };
    } catch (error) {
        console.error('Error in s3 Upload function:', error);
        throw error;
    }
}



    getS3Path(fileName: string) {
        const s3Config = this.configService.get().S3_bucket;
        return `https://${s3Config.bucket_name}.s3.${s3Config.region}.amazonaws.com/${fileName}`;
    }

    async s3MultipleFileUpload(files: any[], folderPath: string): Promise<Array<{ viewUrl: string; downloadUrl: string; filename: string; mimetype: string; size: number }>> {
        try {
            // Convert single file to array for consistent processing
            const filesArray = Array.isArray(files) ? files : [files];
            
            const uploadPromises = filesArray.map((file) => {
                const s3FilePath = `${folderPath}/${file.originalname}`;
                return this.s3FileUpload(file.buffer, s3FilePath, file.originalname);
            });

            const uploadResults = await Promise.all(uploadPromises);
            return uploadResults;
        } catch (error) {
            console.error('Error in multiple S3 file upload:', error);
            throw error;
        }
    }

    private generateFileName(originalName: string) {
        const ext = originalName.split('.').pop();
        return `${Date.now()}-${randomUUID()}.${ext}`;
    }

    certificatePath(fileName: string) {
        return `OPMS/certificates/${fileName}`;
    }

    pdfPath(fileName: string) {
        return `OPMS/pdfs/${fileName}`;
    }

    imagePath(fileName: string) {
        return `OPMS/images/${fileName}`;
    }

    videoPath(fileName: string) {
        return `OPMS/videos/${fileName}`;
    }

    customPath(folder: string, fileName: string) {
        return `OPMS/${folder}/${fileName}`;
    }

    /** ---------- UPLOAD HELPERS --------------- **/

    async uploadCertificate(buffer: Buffer, originalName: string) {
        const fileName = this.generateFileName(originalName);
        const path = this.certificatePath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }

    async uploadPdf(buffer: Buffer, originalName: string) {
        const fileName = this.generateFileName(originalName);
        const path = this.pdfPath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }

    async uploadImage(buffer: Buffer, originalName: string) {
        const fileName = this.generateFileName(originalName);
        const path = this.imagePath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }

    async uploadVideo(buffer: Buffer, originalName: string) {
        const fileName = this.generateFileName(originalName);
        const path = this.videoPath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }

    async uploadToFolder(folder: string, buffer: Buffer, originalName: string) {
        const fileName = this.generateFileName(originalName);
        const path = this.customPath(folder, fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }

}

