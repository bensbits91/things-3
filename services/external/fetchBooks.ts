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
         throw new Error(`Failed to fetch books: ${response.statusText}`);
      }
      const data = await response.json();
      return normalizeGoogleBooksData(data);
   } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
   }
}
