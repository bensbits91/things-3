import dbConnect from '@/lib/db';
import { Search } from '@/models/SearchModel';

export async function getCachedSearch(term: string) {
   try {
      await dbConnect();
      return await Search.findOne({ query: term }).lean();
   } catch (error) {
      console.error('Error fetching cached search:', error);
      throw new Error('Failed to fetch cached search');
   }
}
