import { NextApiRequest, NextApiResponse } from "next";
import { getServiceByTitle } from "@/app/services/verifyService";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({error:`Service cannot be access with ${req.method} method.`})
    }
    const serviceTitle:string|undefined = req.query.serviceTitle as string || req.body.serviceTitle as string
    if(!serviceTitle){
        return res.status(405).json({error:`Service with ${serviceTitle} is not available`}
        )}

    try {
        const form = await getServiceByTitle(serviceTitle)
        return res.status(200).json({form})
    } catch (error) {
        res.status(500).json({error:'Failed to fetch form'})
    }
}