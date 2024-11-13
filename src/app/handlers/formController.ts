import { prisma } from "../db/prisma";
import { FormCreateData } from "../types/types"; // Import necessary types

export async function createForm(
    formData: FormCreateData,
    customFieldsData: Array<{ label: string; fieldType: string; options?: any }>
) {
    if (!formData.serviceId) throw new Error("Service ID is required");

    return await prisma.$transaction(async (prisma) => {
        const newForm = await prisma.form.create({
            data: formData,
        });

        await Promise.all(customFieldsData.map((fieldData) =>
            prisma.customField.create({
                data: {
                    ...fieldData,
                    formId: newForm.id,
                },
            })
        ));

        return newForm;
    });
}
