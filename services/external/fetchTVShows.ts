import { normalizeTmdbData } from '@/utils/normalization';
import { makeSafeQueryString } from '@/utils/string';

// todo: consider creating a shared tmdb service for movies and tv shows
// (or is it better to keep them separate in case we want to switch to a different API in the future?)

export default async function fetchTVShows(term: string) {
   //    const safeType = 'multi';
   const safeSearchTerm = makeSafeQueryString(term);
   const url = `${process.env.TMDB_BASE_URL}/search/tv?query=${safeSearchTerm}&include_adult=false&language=en-US&page=1&append_to_response=images`;
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
         throw new Error(`Failed to fetch TV shows: ${response.statusText}`);
      }
      const data = await response.json();
      return normalizeTmdbData(data);
   } catch (error) {
      console.error('Error fetching TV shows:', error);
      throw error;
   }
}
