import {
  CompleteMultipartUploadCommandOutput,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
  ServiceOutputTypes,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

export class WasabiService {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
      endpoint: "https://s3.wasabisys.com",
    });
  }

  public generateSignedUrl(
    key: string,
    fileType?: string,
    metadata?: any
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: fileType || "text/plain",
      ACL: "public-read",
      Metadata: metadata,
    });

    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  public retriveFileMetadata(key: string): Promise<ServiceOutputTypes> {
    return this.client.send(
      new HeadObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      })
    );
  }

  public saveFile(
    key: string,
    body: Buffer
  ): Promise<CompleteMultipartUploadCommandOutput> {
    const parallelUploads3 = new Upload({
      client: this.client,
      params: {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: body,
        ACL: "public-read",
      },
    });

    return parallelUploads3.done();
  }

  public async deleteFile(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      })
    );
  }

  public async dowloadFileToLocal(key: string): Promise<Readable> {
    const fileStream = await this.client.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      })
    );

    return fileStream.Body as Readable;
  }
}
