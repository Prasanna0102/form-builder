import { NextApiRequest, NextApiResponse } from "next";
import { updateForm } from "@/app/handlers/updateForm";
import { UpdateFormInput } from "@/app/types/types";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'POST'){
        res.setHeader("Allow", ["POST"])
        return res.status(405).end(`Method ${req.method} not allowed to access the desired resource`)
    }
    try {
        const {formId, responseId, formData, attachements} = req.body

        if(!formId||!responseId||!formData){
            return res.status(400).json({message:"formId, formData, responseID is required"})
        }

        const updatedData = await updateForm({
            formId,
            responseId,
            formData,
            attachments: attachements || []
        })

        return res.status(200).json(updatedData)
    } catch (error) {
        console.error("Error updating form: ", error)
        return res.status(500).json({
            message:"An err occurred during the form update",
            error:(error as Error).message
        })
    }
}