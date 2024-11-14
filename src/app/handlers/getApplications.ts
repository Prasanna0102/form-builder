import { prisma } from '@/app/db/prisma';
//import { Application } from '../types/types';

export async function getApplications() {
  try {
    // Fetch all applications from the database
    const applications = await prisma.application.findMany({
      select: {
        id: true,
        formId: true,
        status: true,
        clientId: true,
        additionalInfo: true,
        Notification: true,
        ApplicationForm: true,
        Service: true,
      },
    });

    // Log applications to verify the response content
    console.log('Applications fetched from database:', applications);

    // Return the applications as the expected type
    return applications;
  } catch (error) {
    console.error('Error in getApplications handler:', error);
    throw new Error('Failed to fetch applications');
  }
}