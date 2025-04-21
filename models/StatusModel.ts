import { Schema, model, models, Document } from 'mongoose';

export interface StatusDocument extends Document {
   code: number;
   text: string;
   type: string;
}

const StatusSchema = new Schema<StatusDocument>(
   {
      code: { type: Number, required: true },
      text: { type: String, required: true },
      type: { type: String, required: true }
   },
   { timestamps: true }
);

export const Status = models?.Status || model<StatusDocument>('Status', StatusSchema);
