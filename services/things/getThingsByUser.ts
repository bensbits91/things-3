import dbConnect from '@/lib/db';
import { Thing, ThingDocument } from '@/models/ThingModel';

export async function getThingsByUser(
   userUuid: string
): Promise<ThingDocument[]> {
   try {
      await dbConnect();
      return Thing.getThingsByUser(userUuid);
   } catch (error) {
      console.error('Error fetching things for user:', error);
      throw new Error('Failed to fetch things for user');
   }
}
