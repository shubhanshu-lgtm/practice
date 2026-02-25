import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { config } from 'aws-sdk';
import { S3FileService } from "./s3File.service";
import { ConfigS3Bucket } from "../config/config.interface";

@Module({
    imports: [ConfigModule],
    providers: [S3FileService],
    exports: [S3FileService],
})
export class S3Module {

    public static s3Configure(configData: ConfigS3Bucket)
    {
        const {access_key_id,region,secret_access_key } = configData
        config.update({
            accessKeyId: access_key_id,
            secretAccessKey: secret_access_key,

            region:region,
          });
    }

    public static forRoot(): DynamicModule {
        return {
            module: S3Module,
            imports: [ConfigModule],
            providers: [
                {
                    provide: S3FileService,
                    useFactory: (configService: ConfigService) => {
                        // Optionally configure global aws-sdk here
                        const s3Config = configService.get().S3_bucket;
                        if (s3Config) {
                            S3Module.s3Configure(s3Config);
                        }
                        // Return an instance; DI will treat it as a provider
                        return new S3FileService(configService);
                    },
                    inject: [ConfigService],
                },
            ],
            exports: [S3FileService],
        };
    }
}
