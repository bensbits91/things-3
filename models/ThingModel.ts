import { Schema, Model, model, models, Document, Types } from 'mongoose';
import { Detail } from '@/types/Detail';
import { mapThingDocumentToThing } from '@/utils/thingTransform';

export interface ThingDocument extends Document {
   user_uuid: string;
   name: string;
   detail_id?: Types.ObjectId;
   rating: number;
   status: number;
   times: number;
   tags: Types.ObjectId[];
   review?: string;
   notes?: string;
   is_soft_deleted: boolean;
   createdAt: Date;
   updatedAt: Date;
}

export type AggregatedThing = ThingDocument & {
   detailName?: string;
   type?: string;
   main_image_url?: string;
   statusText?: string;
   genres?: string[];
   country?: string;
   date?: Date;
   description?: string;
   people?: string[];
   language?: string;
   details?: Detail[];
   external_id?: string;
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

const ThingSchema = new Schema<ThingDocument>(
   {
      user_uuid: {
         type: String,
         required: true
      },
      name: {
         type: String,
         required: true
      },
      detail_id: {
         type: Schema.Types.ObjectId,
         ref: 'details'
      },
      rating: { type: Number, min: 0, max: 10, default: 0 },
      status: { type: Number, default: 0 }, // Numeric status for sorting
      times: { type: Number, default: 0 },
      tags: [
         {
            type: Schema.Types.ObjectId,
            ref: 'tags'
         }
      ],
      review: { type: String, maxlength: 1000 },
      notes: { type: String, maxlength: 1000 },
      is_soft_deleted: { type: Boolean, default: false }
   },
   { timestamps: true }
);

ThingSchema.index(
   {
      user_uuid: 1,
      detail_id: 1
   },
   { unique: true }
);

ThingSchema.statics.createThing = async function (
   thingData: CreateThingData
): Promise<ThingDocument> {
   const thing = new this(thingData);
   return thing.save();
};

ThingSchema.statics.getThingsByUser = async function (
   userUuid: string
): Promise<AggregatedThing[]> {
   if (!userUuid) {
      throw new Error('userUuid is required to fetch Things for a user.');
   }

   const things = await this.aggregate<AggregatedThing>([
      { $match: { user_uuid: userUuid } },
      {
         $lookup: {
            from: 'details',
            localField: 'detail_id',
            foreignField: '_id',
            as: 'details'
         }
      }
   ]);

   const transformedThings = await Promise.all(
      things.map(mapThingDocumentToThing)
   );

   return transformedThings;
};

export interface ThingModel extends Model<ThingDocument> {
   createThing(thingData: CreateThingData): Promise<ThingDocument>;
   getThingsByUser(userUuid: string): Promise<ThingDocument[]>;
}

export const Thing = (models?.Thing ||
   model<ThingDocument, ThingModel>('Thing', ThingSchema)) as ThingModel;
