'use client';
import { useState, useCallback } from 'react';
import { useGetThingsByUser } from '@/hooks/things/useGetThingsByUser';
import ThingsViewToolbar from '@/components/things/ThingsViewToolbar';
import ThingsTable from '@/components/things/ThingsTable';
import ThingsGrid from '@/components/things/ThingsGrid';
import ThingsList from '@/components/things/ThingsList';
import ThingsWall from '@/components/things/ThingsWall';
import ThingModal from '@/components/things/ThingModal';
import Loading from '@/components/loading/Loading';
import { Thing } from '@/types/Thing';

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

   const [view, setView] = useState<'table' | 'grid' | 'list' | 'wall'>('wall');
   const handleViewChange = (newView: 'table' | 'grid' | 'list' | 'wall') => {
      setView(newView);
   };

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

   if (isLoading) return <Loading />;
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
         <ThingsViewToolbar
            handleViewClick={handleViewChange}
            selectedView={view}
         />
         {view === 'table' && (
            <ThingsTable things={things} handleItemClick={handleItemClick} />
         )}
         {view === 'grid' && (
            <ThingsGrid things={things} handleItemClick={handleItemClick} />
         )}
         {view === 'list' && (
            <ThingsList things={things} handleItemClick={handleItemClick} />
         )}
         {view === 'wall' && (
            <ThingsWall things={things} handleItemClick={handleItemClick} />
         )}
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
