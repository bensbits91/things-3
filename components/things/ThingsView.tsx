'use client';
import { useState, useCallback } from 'react';
import { useGetThingsByUser } from '@/app/_hooks/things/useGetThingsByUser';
import ThingsTable from './ThingsTable';
import ThingModal from './ThingModal';

interface Thing {
   _id: string;
   name: string;
   description: string;
   main_image_url: string;
   country: string;
   date: string;
   rating: number;
   statusText: string;
   status: number;
   times: number;
   type: string;
   genres: string[];
   language: string;
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
   } = useGetThingsByUser(userUuid);

   const [selectedThing, setSelectedThing] = useState<Thing | null>(null);
   console.log(
      'bb ~ ThingsView.tsx:22 ~ ThingsView ~ selectedThing:',
      selectedThing
   );

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
      return (
         <p>
            Something went wrong while fetching the data. Please try again
            later.
         </p>
      );
   }
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }

   return (
      <>
         <ThingsTable things={things} handleRowClick={handleItemClick} />;
         {selectedThing && (
            <ThingModal
               thing={selectedThing}
               isOpen={!!selectedThing}
               onOpenChange={open => {
                  if (!open) {
                     setSelectedThing(null);
                  }
               }}
            />
         )}
      </>
   );
}
