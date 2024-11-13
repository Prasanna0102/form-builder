import { NextApiRequest, NextApiResponse } from "next";
import { getServiceByTitle } from "@/app/services/verifyService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed.` });
    }

    const serviceTitle = req.query.serviceTitle as string || req.body.serviceTitle as string;
    if (!serviceTitle) {
        return res.status(400).json({ error: `Service title is required.` });
    }

    try {
        const form = await getServiceByTitle(serviceTitle);
        return res.status(200).json({ success: true, form });
    } catch (error) {
        console.error("Error fetching form:", error);
        res.status(500).json({ error: 'Failed to fetch form' });
    }
}
