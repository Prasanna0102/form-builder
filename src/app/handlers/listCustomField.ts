import { prisma } from "../db/prisma";

export default async function listCustomFields(formId: string) {
    try {
        const customFields = await prisma.customField.findMany({
            where: { formId },
        });
        return customFields || [];
    } catch (error) {
        console.error("Error fetching custom fields:", error);
        throw new Error("Failed to fetch custom fields");
    }
}
