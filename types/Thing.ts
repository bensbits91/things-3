import { ThingDocument } from '@/models/ThingModel';
export type Thing = Omit<
   ThingDocument,
   'detail_id' | 'tags' | 'is_soft_deleted' | 'createdAt' | 'updatedAt'
> & {
   _id: string;
   main_image_url?: string;
   statusText?: string;
   genres?: string[];
   language?: string;
   type?: string;
};

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

export type UpdateThingData = Partial<CreateThingData>;
