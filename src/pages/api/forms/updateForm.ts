import { NextApiRequest, NextApiResponse } from "next";
import { updateForm } from "@/app/handlers/updateForm";
import { UpdateFormInput } from "@/app/types/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} not allowed`);
    }

    try {
        const { formId, responseId, formData, attachments } = req.body as UpdateFormInput;

        if (!formId || !responseId || !formData) {
            return res.status(400).json({ message: "formId, responseId, and formData are required" });
        }

        const updatedData = await updateForm({
            formId,
            responseId,
            formData,
            attachments: attachments || []
        });

        return res.status(200).json({ success: true, updatedData });
    } catch (error) {
        console.error("Error updating form:", error);
        return res.status(500).json({
            message: "An error occurred during the form update",
            error: (error as Error).message
        });
    }
}
