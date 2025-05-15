import { Search } from '@/models/SearchModel';

export async function saveSearchResults(term: string, results: unknown) {
   const search = new Search({
      query: term,
    //   type: 'general', // You can expand this to support specific types later
      results
   });
   await search.save();
}
