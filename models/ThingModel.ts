import mongoose, { Schema, model, models, Document } from 'mongoose';
import { StatusService } from '@/services/StatusService';

export interface ThingDocument extends Document {
   user_uuid: string;
   name: string;
   detail_id?: mongoose.Types.ObjectId;
   rating: number;
   status: number;
   times: number;
   tags: mongoose.Types.ObjectId[];
   review?: string;
   notes?: string;
   is_soft_deleted: boolean;
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateThingData {
   user_uuid: string;
   name: string;
   detail_id?: mongoose.Types.ObjectId;
   rating?: number;
   status?: number;
   times?: number;
   tags?: mongoose.Types.ObjectId[];
   review?: string;
   notes?: string;
   is_soft_deleted?: boolean;
}

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
         type: mongoose.Schema.Types.ObjectId,
         ref: 'details'
      },
      rating: { type: Number, min: 0, max: 10, default: 0 },
      status: { type: Number, default: 0 }, // Numeric status for sorting
      times: { type: Number, default: 0 },
      tags: [
         {
            type: mongoose.Schema.Types.ObjectId,
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
): Promise<ThingDocument[]> {
   if (!userUuid) {
      throw new Error('userUuid is required');
   }
   await StatusService.loadStatuses(); // todo: remove this after confirming that statusMap is preloaded in layout.tsx
   const statusMap = StatusService.getStatusMap();
   // console.log('bb ~ ThingModel.ts:85 ~ statusMap:', statusMap);
   const mapStatusToText = (status: number, type: string) => statusMap[type][status];

   const things = await this.aggregate([
      { $match: { user_uuid: userUuid } },
      {
         $lookup: {
            from: 'details', // Name of the collection to join
            localField: 'detail_id', // Field in "things" collection
            foreignField: '_id', // Field in "details" collection
            as: 'details' // Output array field
         }
      }
   ]).then(results =>
      results.map(thing => {
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
      })
   );

   return things;
};

export interface ThingModel extends mongoose.Model<ThingDocument> {
   createThing(thingData: CreateThingData): Promise<ThingDocument>;
   getThingsByUser(userUuid: string): Promise<ThingDocument[]>;
}

export const Thing = (models?.Thing ||
   model<ThingDocument, ThingModel>('Thing', ThingSchema)) as ThingModel;
