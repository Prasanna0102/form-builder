import {prisma} from "../db/prisma"
import { uploadFormDataToS3, uploadAttachmentToS3 } from "../utils/s3client"
import { UpdateFormInput } from "../types/types"


export async function updateForm({formId,responseId, formData, attachments}:UpdateFormInput) {
    console.log("Starting the form Update Process")
    try {
        console.log("Updating the form rsponse data in the database ....")
        const updatedResponse = await prisma.response.update({
            where:{id:responseId},
            data:{
                responseData:formData
            },
            include:{Attachments: true}
        })
        console.log(`Form response updated with ID: ${updatedResponse} is updated successfully`)

        const responseFolder =  `submissions/${responseId}`
        const responseKey = `${responseFolder}/form-response.json`
        console.log(`Updating form data to S3 at key: ${responseKey}`)
        const formS3Url = await uploadFormDataToS3(formData ||{}, responseId)
        console.log(`Form Data uploaded to S3 bucket with the URL ${formS3Url}`)

        await prisma.response.update({
            where:{id:responseId},
            data:{s3Url:formS3Url}
        })

        console.log("Processing attachments....")
        const attachmentPromises =  attachments?.map(async(attachments) => {
            const attachmentKey = `${responseFolder}/attachements/${attachments.fileName}`
            const fileUrl = await uploadAttachmentToS3(
                responseId,
                attachments.fileName,
                attachments.fileContent,
                attachments.fileType
            )

            return prisma.attachment.upsert({
                where:{id:attachments},
                update:{fileUrl},
                create:{
                    responseId,
                    fileName:attachments.fileName,
                    fileUrl,
                    fileType:attachments.fileType
                }
            })
        })

        const updatedAttachments = await Promise.all(attachmentPromises)

        console.log("Form updated successfully")
        return{
            ...updatedResponse,
            s3Url:formS3Url,
            Attachems: updatedAttachments
        }
    } catch (error) {
        console.error("Error during the form update", error)
        throw error
    }   
}