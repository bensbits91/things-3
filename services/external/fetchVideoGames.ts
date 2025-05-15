import { normalizeGiantBombData } from '@/utils/normalization';
import { makeSafeQueryString } from '@/utils/string';

export default async function fetchVideoGames(term: string) {
   const safeSearchTerm = makeSafeQueryString(term);
   const url = `${process.env.GIANTBOMB_BASE_URL}/search?query=${safeSearchTerm}&api_key=${process.env.GIANTBOMB_API_KEY}&format=json`;
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
      return normalizeGiantBombData(data);
   } catch (error) {
      console.error('Error fetching video games:', error);
      throw error;
   }
}
