import { normalizeGoogleBooksData } from '@/utils/normalization';
import { makeSafeQueryString } from '@/utils/string';

export default async function fetchBooks(term: string) {
   const safeSearchTerm = makeSafeQueryString(term);
   const url = `${process.env.GOOGLE_BOOKS_BASE_URL}?q=${safeSearchTerm}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json'
      }
   };
   try {
      const response = await fetch(url, options);

      if (!response.ok) {
         throw new Error(`Failed to fetch video games: ${response.statusText}`);
      }

      const data = await response.json();

      return normalizeGoogleBooksData(data);

      //   return normalizedData.results.map(item => {
      //      const {
      //         id,
      //         title,
      //         name,
      //         overview,
      //         poster_path,
      //         origin_country,
      //         release_date,
      //         first_air_date,
      //         original_language,
      //         genre_ids
      //      } = item;
      //      return {
      //         name: title || name,
      //         type: title ? 'Movie' : 'TV Show', // todo: find a better way to determine type
      //         description: overview,
      //         main_image_url: poster_path
      //            ? `https://image.tmdb.org/t/p/w500${poster_path}`
      //            : null,
      //         country: origin_country?.join(', '),
      //         date: release_date || first_air_date, // todo: convert to date?
      //         language: original_language,
      //         // todo: store genres in a new database collection; services to get genres from each API
      //         genres: genre_ids,
      //         people: [], // todo: get main actors
      //         external_id: id,
      //         external_data: {
      //            ...item
      //         }
      //      };
      //   });
   } catch (error) {
      console.error('Error fetching video games:', error);
      throw error;
   }
}
