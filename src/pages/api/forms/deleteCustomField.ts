import { NextApiRequest, NextApiResponse } from "next";
import deleteCustomField from "@/app/handlers/deleteCustomField";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'DELETE'){
        res.setHeader('Allow',['DELETE'])
        return res.status(405).end(`Method ${req.method} not allowed`)
    }

    try {
        const {customFieldId} = req.body

        if(!customFieldId) {
            return res.status(400).json({ success: false, error: "customFieldId is required" });
        }

        const deletedField = await deleteCustomField(customFieldId)
        return res.status(200).json({success:true, deletedField})
    } catch (error) {
        console.error("Error Deleting Custom Field:", error);
        return res.status(500).json({ success: false, error: "Failed to delete custom field" });
    }
}