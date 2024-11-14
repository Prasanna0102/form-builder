import { prisma } from "../db/prisma";
import { FormCreateData } from "../types/types"; // Import necessary types

export async function createForm(
    formData: FormCreateData,
    customFieldsData: Array<{ label: string; fieldType: string; options?: any }>
) {
    if (!formData.serviceId) throw new Error("Service ID is required");

    const newForm = await prisma.form.create({
        data: formData,
    });

    // Create custom fields in parallel and associate with the new form
    await Promise.all(customFieldsData.map((fieldData) =>
        prisma.customField.create({
            data: {
                ...fieldData,
                formId: newForm.id,
            },
        })
    ));

    return newForm;
}
