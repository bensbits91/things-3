import { ThingDocument, CreateThingData, UpdateThingData } from '@/models/ThingModel';

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

export type { CreateThingData, UpdateThingData };