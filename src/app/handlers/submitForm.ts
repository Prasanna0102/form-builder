import { prisma } from "../db/prisma";
import { S3 } from "aws-sdk";
import { SubmitFormInput } from "../types/types";

const s3 = new S3({ region: process.env.AWS_REGION });

export async function submitForm({ formId, formData, attachments }: SubmitFormInput) {
    const response = await prisma.response.create({
        data: { formId, responseData: formData || {}, s3Url: "" },
    });

    const responseKey = `submissions/${formId}/${response.id}/${Date.now()}-form-response.json`;
    const s3Params = {
        Bucket: process.env.AWS_BUCKET || "",
        Key: responseKey,
        Body: JSON.stringify(formData || {}),
        ContentType: "application/json",
    };
    const formUpload = await s3.upload(s3Params).promise();
    const updatedResponse = await prisma.response.update({
        where: { id: response.id },
        data: { s3Url: formUpload.Location },
    });

    const attachmentUploads = attachments.map(async (attachment) => {
        const attachmentKey = `submissions/${formId}/${response.id}/attachments/${attachment.fileName}`;
        const upload = await s3.upload({
            Bucket: process.env.AWS_BUCKET || "",
            Key: attachmentKey,
            Body: attachment.fileContent,
            ContentType: attachment.fileType,
        }).promise();

        return prisma.attachment.create({
            data: {
                responseId: response.id,
                fileName: attachment.fileName,
                fileUrl: upload.Location,
                fileType: attachment.fileType,
            },
        });
    });

    await Promise.all(attachmentUploads);
    return updatedResponse;
}
