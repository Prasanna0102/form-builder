import { NextApiRequest, NextApiResponse } from "next";
import { submitForm } from "@/app/handlers/submitForm";
import { SubmitFormInput } from "@/app/types/types";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method == 'POST'){
        try {
            const {formId, formData, attachments} =  req.body as SubmitFormInput

            if(!formId || !formData){
                return res.status(400).json({message:"formId or formData are required"})
            }

            const response =await submitForm({
                formId,
                formData,
                attachments: attachments ||[]
            })
            return res.status(200).json(response)
        } catch (error) {
            console.error("Error submitting form: ", error)
            return res.status(500).json({message:"An error has occured during the form submission", error})
        }
    }else {
        res.setHeader("Allow",["POST"])
        res.status(405).end(`Method ${req.method} Not Allowed!!`)
    }
}