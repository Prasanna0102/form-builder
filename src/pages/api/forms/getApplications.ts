import { NextApiRequest, NextApiResponse } from 'next';
import { getApplications } from '@/app/handlers/getApplications';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  try {
    // Fetch applications
    const applications = await getApplications();

    // Check the structure of the applications and log for debugging
    console.log('Fetched applications:', applications);

    // Return the applications as a successful JSON response
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error('Error fetching applications:', error);

    // Send a standardized error response
    return res.status(500).json({ success: false, error: 'Failed to fetch applications' });
  }
}