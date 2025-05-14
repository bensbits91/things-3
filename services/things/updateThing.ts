import dbConnect from '@/lib/db';
import { Thing, ThingDocument, UpdateThingData } from '@/models/ThingModel';

export async function updateThing(
   thingData: UpdateThingData
): Promise<ThingDocument | null> {
   try {
      await dbConnect();
      return Thing.updateThing(thingData);
   } catch (error) {
      console.error('Error updating thing:', error);
      throw new Error('Failed to update thing');
   }
}
