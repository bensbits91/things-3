'use client';
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import ThingsTable from './ThingsTable';

interface Thing {
   _id: string;
   name: string;
   description: string;
   main_image_url: string;
   country: string;
   date: string;
   rating: number;
   statusText: string;
}

async function fetchThings(userUuid: string) {
   const response = await fetch(`/api/things?user_uuid=${userUuid}`);
   if (!response.ok) {
      throw new Error('Failed to fetch things');
   }
   return response.json();
}

export default function ThingsView({ userUuid }: { userUuid: string }) {
   if (!userUuid) {
      throw new Error('userUuid is required');
   }

   const {
      data: things = [],
      isLoading,
      isError,
      error
   } = useQuery({
      queryKey: ['things', userUuid],
      queryFn: () => fetchThings(userUuid),
      staleTime: 1000 * 60 * 60 * 5 // 5 hours
   });

   const [selectedThing, setSelectedThing] = useState<Thing | null>(null);
   console.log('bb ~ ThingsView.tsx:22 ~ ThingsView ~ selectedThing:', selectedThing);

   const handleItemClick = useCallback(
      (thingId: string) => {
         const thing = things?.find((thing: Thing) => thing._id === thingId);
         setSelectedThing(thing || null);
      },
      [things]
   );

   if (isLoading) return <p>Loading...</p>;
   if (isError) {
      console.error('Error fetching things:', error);
      return <p>Something went wrong while fetching the data. Please try again later.</p>;
   }
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }

   return <ThingsTable things={things} handleRowClick={handleItemClick} />;
}
