import Image from 'next/image';
import { Section } from '@/components/layout';
import { Thing } from '@/types/Thing';
import { SearchResult } from '@/types/Search';

interface ThingsWallProps {
   things: Thing[] | SearchResult[];
   handleItemClick: (thingId: string) => void;
   isSearch?: boolean;
}

export default function ThingsWall({
   things,
   handleItemClick,
   isSearch = false
}: ThingsWallProps) {
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }
   return (
      <Section>
         <div className="grid max-w-screen auto-cols-min grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-0 md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] lg:max-w-5xl">
            {things.map((thing, index) => {
               const { name, main_image_url } = thing;
               if (!main_image_url) {
                  return null;
               }
               let external_id = '',
                  _id = '';
               if (!isSearch) {
                  _id = (thing as Thing)._id;
               } else {
                  external_id = (thing as SearchResult).external_id || '';
               }

               const key = isSearch
                  ? external_id || `search-fallback-${index}`
                  : _id || `thing-fallback-${index}`;

               return (
                  <div
                     key={key}
                     className="cursor-pointer"
                     onClick={() => handleItemClick(key)}>
                     {main_image_url && (
                        <div className="relative h-40 w-20 overflow-hidden md:h-60 md:w-30">
                           <Image
                              src={main_image_url}
                              alt={name}
                              fill
                              sizes="(max-width: 768px) 80px, 160px"
                              style={{ objectFit: 'cover' }}
                              loading="lazy"
                              className="transition-transform duration-300 md:hover:scale-105"
                           />
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </Section>
   );
}
