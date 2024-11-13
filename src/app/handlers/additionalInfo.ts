import { prisma } from '../db/prisma';

export default async function requestAdditionalInfo(applicationId: string, additionalInfo: any) {
    return await prisma.$transaction(async (prisma) => {
        const application = await prisma.application.findUnique({
            where: { id: applicationId },
        });
        if (!application) throw new Error("Application not found");

        const updatedApplication = await prisma.application.update({
            where: { id: applicationId },
            data: {
                additionalInfo,
                notifiedAt: new Date(),
            },
        });

        await prisma.notification.create({
            data: {
                applicationId,
                message: 'Additional information requested',
            },
        });

        return updatedApplication;
    });
}
