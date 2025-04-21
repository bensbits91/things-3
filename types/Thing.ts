export interface Thing {
   _id: string;
   name: string;
   description?: string;
   main_image_url?: string;
   country?: string;
   date?: string;
   rating?: number;
   statusText?: string;
   status?: number;
   times?: number;
   type?: string;
   genres?: string[];
   language?: string;
}

export type CreateThingData = Omit<Thing, '_id'>; // For creating a new Thing
export type UpdateThingData = Partial<CreateThingData>; // For updating a Thing
