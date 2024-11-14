import { NextApiRequest,NextApiResponse } from "next";
import requestAdditionalInfo from "@/app/handlers/additionalInfo";
import {RequestAdditionalInfoInput} from "@/app/types/types"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== "POST"){
        res.setHeader('Alllow',["POST"])
        return res.status(405).end(`Method ${req.method} is not allowed`)
    }
    try {
        const {applicationId, additionalInfo} = req.body as RequestAdditionalInfoInput

        if(!applicationId||!additionalInfo){
            return res.status(400).json({ success: false, error: "applicationId and additionalInfo are required" });
        }

        const updatedApplication =  await requestAdditionalInfo(applicationId, additionalInfo)
        return res.status(200).json({ success: true, updatedApplication });
    } catch (error) {
        console.error("Error Requesting Additional Info:", error);
        return res.status(500).json({ success: false, error: "Failed to request additional information" });
    }
}