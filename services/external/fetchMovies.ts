import { normalizeTmdbData } from '@/utils/normalization';
import { makeSafeQueryString } from '@/utils/string';

export default async function fetchMovies(term: string) {
   //    const safeType = 'multi';
   const safeSearchTerm = makeSafeQueryString(term);
   const url = `${process.env.TMDB_BASE_URL}/search/movie?query=${safeSearchTerm}&include_adult=false&language=en-US&page=1&append_to_response=images`;
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.TMDB_TOKEN}`
      }
   };

   try {
      const response = await fetch(url, options);
      if (!response.ok) {
         throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
      const data = await response.json();
      return normalizeTmdbData(data);
   } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
   }
}
