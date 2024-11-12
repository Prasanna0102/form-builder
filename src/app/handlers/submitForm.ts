import { prisma } from "../db/prisma";
import { S3 } from "aws-sdk";
import { Response, Attachment, SubmitFormInput } from "../types/types";
import { InputJsonValue } from "@prisma/client/runtime/library";

// Initialize the S3 client
const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

export async function submitForm({ formId, formData, attachments }: SubmitFormInput): Promise<Response> {
    console.log("Starting the form submission process...");

    try {
        // Ensure responseData is non-null by providing a default empty object
        console.log("Saving form response data to the database...");
        const saveResponse = await prisma.response.create({
            data: {
                formId,
                responseData: (formData || {}) as InputJsonValue,
                s3Url: "",
            },
            include: { Attachments: true },
        });
        console.log(`Form response saved with ID: ${saveResponse.id}`);

        // Folder structure based on responseId
        const responseFolder = `submissions/${saveResponse.id}`;

        // Upload form JSON data to S3
        const responseKey = `${responseFolder}/form-response.json`;
        const formS3Params = {
            Bucket: process.env.AWS_BUCKET || "", 
            Key: responseKey,
            Body: JSON.stringify(formData || {}),
            ContentType: "application/json",
        };

        console.log(`Uploading form data to S3 with key: ${responseKey}`);
        const formUploadResult = await s3.upload(formS3Params).promise();
        console.log(`Form data uploaded to S3 at URL: ${formUploadResult.Location}`);

        // Update response with S3 URL of the form data JSON
        console.log("Updating the response with the S3 URL in the database...");
        const updatedResponse = await prisma.response.update({
            where: { id: saveResponse.id },
            data: { s3Url: formUploadResult.Location },
        });
        console.log("Form response updated successfully with S3 URL");

        // Upload each attachment to S3 and save metadata
        console.log(`Uploading ${attachments.length} attachments to S3...`);
        const attachmentPromises = attachments.map(async (attachment, index) => {
            const attachmentKey = `${responseFolder}/attachments/${attachment.fileName}`;
            const s3Params = {
                Bucket: process.env.AWS_BUCKET || "",
                Key: attachmentKey,
                Body: attachment.fileContent,
                ContentType: attachment.fileType,
            };
            console.log(`Uploading attachment ${index + 1} with key: ${attachmentKey}`);
            const uploadResult = await s3.upload(s3Params).promise();
            console.log(`Attachment ${index + 1} uploaded to S3 at URL: ${uploadResult.Location}`);

            // Save attachment metadata
            console.log(`Saving attachment metadata for attachment ${index + 1} to the database...`);
            return prisma.attachment.create({
                data: {
                    responseId: saveResponse.id,
                    fileName: attachment.fileName,
                    fileUrl: uploadResult.Location,
                    fileType: attachment.fileType,
                },
            });
        });

        const savedAttachments: Attachment[] = await Promise.all(attachmentPromises);
        console.log(`All attachments uploaded and saved. Total attachments: ${savedAttachments.length}`);

        console.log("Form submission process completed successfully.");
        return { ...updatedResponse, Attachments: savedAttachments } as Response;

    } catch (error: unknown) {
        console.error("Error during form submission process:", error);

        if (error instanceof Error) {
            if ("code" in error) {
                console.error("AWS S3 error:", error.message);
            } else {
                console.error("Database error:", error.message);
            }
        } else {
            console.error("Unexpected error:", error);
        }

        throw error;
    }
}
