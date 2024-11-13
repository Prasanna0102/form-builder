import { NextApiRequest, NextApiResponse } from "next";
import { submitForm } from "@/app/handlers/submitForm";
import { SubmitFormInput } from "@/app/types/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { formId, formData, attachments } = req.body as SubmitFormInput;

        if (!formId || !formData) {
            return res.status(400).json({ message: "formId and formData are required" });
        }

        const response = await submitForm({
            formId,
            formData,
            attachments: attachments || []
        });
        return res.status(200).json({ success: true, response });
    } catch (error) {
        console.error("Error submitting form:", error);
        return res.status(500).json({ message: "An error occurred during form submission", error: (error as Error).message });
    }
}
