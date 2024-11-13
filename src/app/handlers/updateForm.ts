import { prisma } from "../db/prisma";
import { uploadFormDataToS3, uploadAttachmentToS3 } from "../utils/s3client";
import { UpdateFormInput } from "../types/types";

export async function updateForm({ formId, responseId, formData, attachments }: UpdateFormInput) {
    const updatedResponse = await prisma.response.update({
        where: { id: responseId },
        data: { responseData: formData },
    });

    const formS3Url = await uploadFormDataToS3(formData, responseId);
    await prisma.response.update({
        where: { id: responseId },
        data: { s3Url: formS3Url },
    });

    const attachmentPromises = attachments.map((attachment) => {
        const fileContentBuffer = Buffer.isBuffer(attachment.fileContent)
            ? attachment.fileContent
            : Buffer.from(attachment.fileContent, 'utf-8'); // Convert string to Buffer if necessary

        return uploadAttachmentToS3(responseId, attachment.fileName, fileContentBuffer, attachment.fileType);
    });

    const updatedAttachments = await Promise.all(attachmentPromises);
    return { ...updatedResponse, attachments: updatedAttachments };
}
