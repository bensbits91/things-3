'use client';
import { useState, useCallback, useMemo } from 'react';
import { useSearch } from '@/hooks/search';
import { SearchForm } from '@/components/search';
import ThingsViewToolbar from '@/components/things/ThingsViewToolbar';
import ThingsTable from '@/components/things/ThingsTable';
import ThingsGrid from '@/components/things/ThingsGrid';
import ThingsList from '@/components/things/ThingsList';
import ThingsWall from '@/components/things/ThingsWall';
import ThingModal from '@/components/things/ThingModal';
import { SearchResult, SearchResults } from '@/types/Search';

export default function SearchView() {
   const { results = {} }: { results?: Partial<SearchResults> } = useSearch();
   console.log('bb ~ SearchView.tsx:15 ~ SearchView ~ results:', results);
   const { books, movies, tv, videoGames } = results || {}; // todo: this is working but we have a type mismatch or something

   const combinedResults = useMemo(() => {
      return [
         ...(books ?? []),
         ...(movies ?? []),
         ...(tv ?? []),
         ...(videoGames ?? [])
      ];
   }, [books, movies, tv, videoGames]);

   const [view, setView] = useState<'table' | 'grid' | 'list' | 'wall'>(
      'table'
   );
   const handleViewChange = (newView: 'table' | 'grid' | 'list' | 'wall') => {
      setView(newView);
   };

   const [selectedThing, setSelectedThing] = useState<SearchResult | null>(
      null
   );

   const handleItemClick = useCallback(
      (thingId: string) => {
         console.log('bb ~ SearchView.tsx:43 ~ SearchView ~ thingId:', thingId);
         console.log(
            'bb ~ SearchView.tsx:45 ~ thing ~ combinedResults:',
            combinedResults
         );
         const thing = combinedResults?.find((thing: SearchResult) => {
            return thing.external_id === thingId;
         });
         console.log('bb ~ SearchView.tsx:46 ~ SearchView ~ thing:', thing);
         setSelectedThing(thing || null);
      },
      [combinedResults]
   );

   return (
      <>
         <ThingsViewToolbar
            selectedView={view}
            handleViewClick={handleViewChange}
         />
         <SearchForm />
         {combinedResults && combinedResults.length > 0 && (
            <>
               {view === 'table' && (
                  <ThingsTable
                     things={combinedResults}
                     handleItemClick={handleItemClick}
                     isSearch={true}
                  />
               )}
               {view === 'grid' && (
                  <ThingsGrid
                     things={combinedResults}
                     handleItemClick={handleItemClick}
                     isSearch={true}
                  />
               )}
               {view === 'list' && (
                  <ThingsList
                     things={combinedResults}
                     handleItemClick={handleItemClick}
                     isSearch={true}
                  />
               )}
               {view === 'wall' && (
                  <ThingsWall
                     things={combinedResults}
                     handleItemClick={handleItemClick}
                     isSearch={true}
                  />
               )}
               {selectedThing && (
                  <ThingModal
                     thing={selectedThing}
                     isSearch={true}
                     //  userUuid={userUuid}
                     isOpen={!!selectedThing}
                     onOpenChange={open => {
                        if (!open) {
                           setSelectedThing(null);
                        }
                     }}
                  />
               )}
            </>
         )}
      </>
   );
}
