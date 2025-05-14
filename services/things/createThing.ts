import dbConnect from '@/lib/db';
import { Thing, ThingDocument, CreateThingData } from '@/models/ThingModel';

export async function createThing(
   thingData: CreateThingData
): Promise<ThingDocument> {
   try {
      await dbConnect();
      return Thing.createThing(thingData);
   } catch (error) {
      console.error('Error creating thing:', error);
      throw new Error('Failed to create thing');
   }
}
