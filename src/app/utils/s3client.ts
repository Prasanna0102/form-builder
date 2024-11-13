import { S3 } from "aws-sdk";
const s3 = new S3({ region: process.env.AWS_REGION });

export async function uploadFormDataToS3(formData: any, responseId: string) {
    const key = `submissions/${responseId}/form-response.json`;
    const s3Params = {
        Bucket: process.env.AWS_BUCKET || "",
        Key: key,
        Body: JSON.stringify(formData),
        ContentType: "application/json",
    };
    const upload = await s3.upload(s3Params).promise();
    return upload.Location;
}

export async function uploadAttachmentToS3(responseId: string, fileName: string, fileContent: Buffer, fileType: string) {
    const key = `submissions/${responseId}/attachments/${fileName}`;
    const s3Params = {
        Bucket: process.env.AWS_BUCKET || "",
        Key: key,
        Body: fileContent,
        ContentType: fileType,
    };
    const upload = await s3.upload(s3Params).promise();
    return upload.Location;
}
