import { NextApiRequest, NextApiResponse } from "next";
import createCustomField from "@/app/handlers/customFields";
import {CustomField} from "../../../app/types/types"

export async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "Post"){
        res.setHeader('Allow',['POST'])
        return res.status(405).end(`Method ${req.method} is not allowed`)
    }

    try {
        const {formId, label, fieldType,options} =  req.body as CustomField

        if(!formId||!label||!fieldType){
            return res.status(400).json({ success: false, error: "formId, label, and fieldType are required" });
        }

        const customField = await createCustomField(formId,label,fieldType,options)
        return res.status(201).json({success:true, customField})
    } catch (error) {
        console.error("Error creating Custom Field", error)
        return res.status(500).json({success:false, error:"Failed to create custom field"})
    }
}