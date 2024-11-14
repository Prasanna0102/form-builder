import { NextApiRequest, NextApiResponse } from 'next';
import { createForm } from '@/app/handlers/formController';
import { CreateFormRequestBody } from '@/app/types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    try {
        const { formData, customFieldsData } = req.body as CreateFormRequestBody;

        if (!formData || !customFieldsData) {
            return res.status(400).json({ success: false, error: "Missing form data or custom fields" });
        }

        const newForm = await createForm(formData, customFieldsData);
        res.status(201).json({ success: true, form: newForm });
    } catch (error) {
        console.error("Error Creating Form:", error);
        res.status(500).json({ success: false, error: "Failed to create form" });
    }
}
