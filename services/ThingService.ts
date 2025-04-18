import dbConnect from '@/lib/db';
import { Thing, ThingDocument, CreateThingData } from '@/models/ThingModel';

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

export async function createThing(thingData: CreateThingData): Promise<ThingDocument> {
   try {
      await dbConnect();
      return Thing.createThing(thingData);
   } catch (error) {
      console.error('Error creating thing:', error);
      throw new Error('Failed to create thing');
   }
}
