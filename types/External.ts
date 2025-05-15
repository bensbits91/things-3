export interface TmdbItem {
   id: number;
   title?: string;
   name?: string;
   overview: string;
   poster_path?: string;
   origin_country?: string[];
   release_date?: string;
   first_air_date?: string;
   original_language: string;
   genre_ids: number[];
}
export interface TmdbData {
   results: Array<TmdbItem>;
}

export interface GoogleBooksItem {
   id: string;
   saleInfo: {
      country: string;
   };
   volumeInfo: {
      title: string;
      description: string;
      imageLinks?: {
         thumbnail: string;
      };
      authors?: string[];
      publishedDate: string;
      language: string;
      categories: string[];
   };
}
export interface GoogleBooksData {
   items: Array<GoogleBooksItem>;
}

export interface GiantBombItem {
   id: number;
   name: string;
   deck?: string;
   description: string;
   image?: {
      medium_url: string;
   };
   original_release_date: string;
}
export interface GiantBombData {
   results: Array<GiantBombItem>;
}
