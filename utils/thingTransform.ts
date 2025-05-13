import { AggregatedThing } from '@/models/ThingModel';
import { getStatusMap } from '@/services/StatusService';

/* TODO:
   Fields like statusText and main_image_url are derived in the backend but are not explicitly validated.
   Consider adding validation logic to ensure these fields are always populated correctly before sending data to the frontend.
*/

export async function mapThingDocumentToThing(
   thing: AggregatedThing
): Promise<AggregatedThing> {
   const statusMap = await getStatusMap();
   const mapStatusToText = (status: number, type: string) =>
      statusMap[type][status];

   if (thing.details && thing.details.length > 0) {
      const detail = thing.details[0];
      const {
         name,
         type,
         external_id,
         country,
         date,
         description,
         genres,
         language,
         main_image_url,
         people
      } = detail;

      thing.detailName = name;
      thing.type = type;
      thing.external_id = external_id;
      thing.country = country;
      thing.date = date;
      thing.description = description;
      thing.genres = genres;
      thing.language = language;
      thing.main_image_url = main_image_url;
      thing.people = people;
      thing.statusText = mapStatusToText(thing.status, type);
   }
   return thing;
}
