import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";
import { Form, FormCreateData } from "../types/types"; // Import the necessary types

export async function createForm(
  formData: FormCreateData,
  customFieldsData: Array<{ label: string; fieldType: string; options?: any }>
): Promise<Form | void> {
  try {
    // Validate formData and customFieldsData (add specific checks as needed)
    if (!formData || !formData.serviceId) {
      throw new Error("Invalid formData or missing serviceId.");
    }

    // Use a transaction to ensure both form and custom fields are created together
    const result = await prisma.$transaction(async (prisma) => {
      // Step 1: Create the form and link it to the provided service ID
      const newForm = await prisma.form.create({
        data: {
          ...formData,
          serviceId: formData.serviceId,
        },
        include: {
          Service: true,
          Responses: true,
          CustomFields: true,
          ApplicationForms: true,
          Application: true,
        },
      });

      // Step 2: Create associated custom fields for the form
      await Promise.all(
        customFieldsData.map((fieldData) =>
          prisma.customField.create({
            data: {
              ...fieldData,
              options: fieldData.options || {}, // Default to an empty object if options is undefined
              formId: newForm.id, // Link each custom field to the new form
            },
          })
        )
      );

      // Return the created form
      return newForm as unknown as Form;
    });

    return result;
  } catch (error) {
    console.error("Error creating form:", error);
    throw error; // Re-throw error for handling by the caller
  }
}
