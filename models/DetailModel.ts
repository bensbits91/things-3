import { Schema, model, models, Document, Model } from 'mongoose';

export interface DetailDocument extends Document {
   name: string;
   type: string;
   external_id?: string;
   country?: string;
   date?: Date;
   description?: string;
   genres?: string[];
   language?: string;
   main_image_url?: string;
   people?: string[];
   external_data?: Record<string, unknown>; // Raw data from external APIs
   createdAt: Date;
   updatedAt: Date;
}

const DetailSchema = new Schema<DetailDocument>(
   {
      name: { type: String, required: true },
      type: {
         type: String,
         enum: ['Movie', 'TV Show', 'Book', 'Video Game', 'Other'], // Restrict to specific values
         required: true
      },
      external_id: { type: String, required: true, maxlength: 255 },
      country: { type: String },
      date: { type: Date },
      description: { type: String },
      genres: { type: [String], default: [] }, // Default to an empty array
      language: { type: String },
      main_image_url: { type: String },
      people: { type: [String], default: [] }, // Default to an empty array
      external_data: { type: Schema.Types.Mixed } // Store raw external API data
   },
   { timestamps: true }
);

// Add a compound unique index to prevent duplicates
DetailSchema.index(
   { name: 1, type: 1, external_id: 1 },
   { unique: true }
);

export const Detail = (models?.Detail ||
   model<DetailDocument>('Detail', DetailSchema)) as Model<DetailDocument>;