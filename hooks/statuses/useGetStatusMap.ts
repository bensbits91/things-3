import { useQuery } from '@tanstack/react-query';

async function fetchStatuses() {
   const response = await fetch('/api/statuses');
   if (!response.ok) {
      throw new Error('Failed to fetch statuses');
   }
   return response.json();
}

export function useGetStatusMap() {
   return useQuery({
      queryKey: ['statuses'],
      queryFn: fetchStatuses,
      staleTime: 1000 * 60 * 60 * 5, // Cache for 5 hours
   });
}