import { prisma } from "../db/prisma";

export default async function createCustomField(
    formId: string,
    label: string,
    fieldType: string, // Specific types
    options: any = null // Options is optional and typed as any for flexibility
) {
    try {
        const customField = await prisma.customField.create({
            data: {
                formId,
                label,
                fieldType,
                options,
            },
        });
        return customField;
    } catch (error) {
        console.error("Error creating custom field:", error);
        throw new Error("Failed to create custom field");
    }
}
