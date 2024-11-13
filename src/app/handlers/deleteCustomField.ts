import { prisma } from "../db/prisma";

export default async function deleteCustomField(customFieldId: string) {
    try {
        const customField = await prisma.customField.delete({
            where: { id: customFieldId },
        });
        return customField;
    } catch (error) {
        console.error("Error deleting custom field:", error);
        throw new Error("Failed to delete custom field");
    }
}
