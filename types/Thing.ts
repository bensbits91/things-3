import { ThingDocument } from '@/models/ThingModel';
// export interface Thing {
//    _id: string;
//    name: string;
//    description?: string;
//    main_image_url?: string;
//    country?: string;
//    date?: string;
//    rating?: number;
//    statusText?: string;
//    status?: number;
//    times?: number;
//    type?: string;
//    genres?: string[];
//    language?: string;
// }
export type Thing = Omit<
   ThingDocument,
   'detail_id' | 'tags' | 'is_soft_deleted' | 'createdAt' | 'updatedAt'
> & {
   main_image_url?: string;
   statusText?: string;
   genres?: string[];
   language?: string;
   type?: string;
};

// export type CreateThingData = Omit<Thing, '_id'>; // For creating a new Thing
export type CreateThingData = Pick<
   ThingDocument,
   | 'user_uuid'
   | 'name'
   | 'detail_id'
   | 'rating'
   | 'status'
   | 'times'
   | 'tags'
   | 'review'
   | 'notes'
>;

export type UpdateThingData = Partial<CreateThingData>; // For updating a Thing
