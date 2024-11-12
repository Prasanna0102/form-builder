import { Service, Form } from "../types/types";
import { prisma } from "../db/prisma";

export async function getServiceByTitle(serviceTitle: string): Promise<Form[] | undefined> {
    try {
        const serviceForms = await prisma.form.findMany({
            where: { Service: { title: serviceTitle } },
        });

        return serviceForms.length > 0 ? serviceForms as unknown as Form[] : undefined;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
