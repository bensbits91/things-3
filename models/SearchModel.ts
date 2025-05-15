import { Schema, Model, model, models, Document /* , Types */ } from 'mongoose';

export interface SearchResult {
   name: string;
   description: string;
   date: string | Date;
   country: string;
   main_image_url?: string;
   genres?: string[];
   language?: string;
   type?: string;
   external_id?: string;
   people?: string[];
   external_data?: unknown; // todo: Define a more specific type for external_data
}

export interface SearchResults {
   books: SearchResult[];
   movies: SearchResult[];
   tv: SearchResult[];
   videoGames: SearchResult[];
}

export interface SearchDocument extends Document {
   query: string;
   results: SearchResults;
   createdAt: Date;
   updatedAt: Date;
}

export type CreateSearchData = Omit<SearchDocument, 'createdAt' | 'updatedAt'>;

const SearchSchema = new Schema<SearchDocument>(
   {
      query: {
         type: String,
         unique: true,
         index: true,
         required: true
      },
      results: {
         type: Schema.Types.Mixed, // todo: Define a more specific schema for results
         required: true
      }
   },
   { timestamps: true }
);

SearchSchema.statics.createSearch = async function (
   searchData: CreateSearchData
): Promise<SearchDocument> {
   const search = new this(searchData);
   return search.save();
};

SearchSchema.statics.getSearch = async function (
   query: string
): Promise<SearchDocument | null> {
   return this.findOne({ query });
};

// SearchSchema.statics.getAllSearches = async function (): Promise<

export interface SearchModel extends Model<SearchDocument> {
   createSearch: (thingData: CreateSearchData) => Promise<SearchDocument>;
   getSearch: (query: string) => Promise<SearchDocument | null>;
}

export const Search = (models?.Search ||
   model<SearchDocument, SearchModel>('Search', SearchSchema)) as SearchModel;
