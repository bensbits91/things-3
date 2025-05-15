import Image from 'next/image';
import { Section } from '@/components/layout';
import { Rating } from '@/components/inputs';
import ThingInfoBar from './ThingInfoBar';
import { truncateString } from '@/utils/string';
import { Thing } from '@/types/Thing';
import { SearchResult } from '@/types/Search';

interface ThingsGridProps {
   things: Thing[] | SearchResult[];
   handleItemClick: (thingId: string) => void;
   isSearch?: boolean;
}

export default function ThingsGrid({
   things,
   handleItemClick,
   isSearch = false
}: ThingsGridProps) {
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }
   return (
      <Section width="lg">
         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {things.map((thing, index) => {
               const {
                  name,
                  main_image_url,
                  description,
                  type,
                  date,
                  country
               } = thing;
               if (!name) {
                  return null;
               }
               let external_id = '',
                  _id = '',
                  rating = 0,
                  statusText = 'Unset';
               if (!isSearch) {
                  _id = (thing as Thing)._id;
                  rating = (thing as Thing).rating;
                  statusText = (thing as Thing).statusText || 'Unset';
               } else {
                  external_id = (thing as SearchResult).external_id || '';
               }

               const hasRating = typeof rating === 'number' && rating > 0;
               const hasStatusText = statusText && statusText !== 'Unset';

               const key = isSearch
                  ? external_id || `search-fallback-${index}`
                  : _id || `thing-fallback-${index}`;

               return (
                  <div
                     key={key}
                     className="flex cursor-pointer flex-col items-center overflow-hidden rounded-lg border shadow-[-1px_4px_8px_0] shadow-black/70 transition-colors duration-300 hover:bg-[var(--bb-surface-a10)]"
                     onClick={() => handleItemClick(key)}>
                     {main_image_url && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                           <Image
                              src={main_image_url}
                              alt={name}
                              fill
                              sizes="(max-width: 768px) 100vw, 50px" // Full width on small screens, 50px on larger screens
                              style={{ objectFit: 'cover' }}
                              loading="lazy"
                              className="rounded-t-lg transition-transform duration-300 hover:scale-105"
                           />
                        </div>
                     )}
                     <div className="p-4">
                        <h3 className="mt-2 text-lg">{name}</h3>
                        {(hasRating || hasStatusText) && (
                           <div className="flex items-center gap-2">
                              {hasStatusText && (
                                 <p className="mt-1 text-sm">{statusText}</p>
                              )}
                              {hasRating && (
                                 <Rating
                                    rating={rating}
                                    editable={false}
                                    starSize="sm"
                                 />
                              )}
                           </div>
                        )}
                        <ThingInfoBar
                           type={type}
                           date={date}
                           country={country}
                        />
                        {description && (
                           <p className="mt-1 text-sm">
                              {truncateString(description, 100).newString}
                           </p>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
      </Section>
   );
}
