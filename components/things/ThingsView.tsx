'use client';

import { useQuery } from '@tanstack/react-query';

async function fetchThings(userUuid: string) {
   const response = await fetch(`/api/things?user_uuid=${userUuid}`);
   if (!response.ok) {
      throw new Error('Failed to fetch things');
   }
   return response.json();
}

export default function ThingsView({ userUuid }: { userUuid: string }) {
   const {
      data: things,
      isLoading,
      isError,
      error
   } = useQuery({
      queryKey: ['things', userUuid],
      queryFn: () => fetchThings(userUuid),
      staleTime: 1000 * 60 * 60 * 5 // 5 hours
   });

   if (isLoading) return <p>Loading...</p>;
   if (isError) return <p>Error: {error.message}</p>;
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }
   console.log('bb ~ ThingsView.tsx:28 ~ ThingsView ~ things:', things);

   return (
      <ul>
         {things.map((thing: { name: string }, index: number) => (
            <li key={index}>{thing.name}</li>
         ))}
      </ul>
   );
}
