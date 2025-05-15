import { NextResponse } from 'next/server';
import { getCachedSearch, saveSearchResults } from '@/services/search';
import {
   fetchBooks,
   fetchMovies,
   fetchTVShows,
   fetchVideoGames
} from '@/services/external';

export async function POST(req: Request) {
   try {
      const { term } = await req.json(); // Parse the search term from the request body

      if (!term) {
         return NextResponse.json(
            { error: 'Search term is required' },
            { status: 400 }
         );
      }

      // Check if the search is cached in the database
      const cachedResults = await getCachedSearch(term);
      if (cachedResults) {
         return NextResponse.json(cachedResults, { status: 200 });
      }

      // Fetch results from third-party APIs
      const [books, movies, tv, videoGames] = await Promise.all([
         fetchBooks(term),
         fetchMovies(term),
         fetchTVShows(term),
         fetchVideoGames(term)
      ]);

      // Normalize the results
      const results = {
         books,
         movies,
         tv,
         videoGames
      };

      // Save the results to the database
      await saveSearchResults(term, results);

      return NextResponse.json(results, { status: 200 });
   } catch (error) {
      console.error('Error handling search:', error);
      return NextResponse.json(
         { error: 'Failed to handle search' },
         { status: 500 }
      );
   }
}
