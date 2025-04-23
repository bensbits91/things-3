import { useQuery } from '@tanstack/react-query';

async function fetchThings(userUuid: string) {
   const response = await fetch(`/api/things?user_uuid=${userUuid}`);
   if (!response.ok) {
      throw new Error('Failed to fetch things');
   }
   return response.json();
}

export function useGetThingsByUser(userUuid: string) {
   return useQuery({
      queryKey: ['things', userUuid],
      queryFn: () => fetchThings(userUuid),
      staleTime: 1000 * 60 * 60 * 5 // 5 hours
   });
}
