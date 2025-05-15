import Image from 'next/image';
import { Section } from '@/components/layout';
import { Rating } from '@/components/inputs';
import ThingInfoBar from './ThingInfoBar';
import { truncateString } from '@/utils/string';
import { Thing } from '@/types/Thing';
import { SearchResult } from '@/types/Search';

interface ThingsListProps {
   things: Thing[] | SearchResult[];
   handleItemClick: (thingId: string) => void;
   isSearch?: boolean;
}

export default function ThingsList({
   things,
   handleItemClick,
   isSearch = false
}: ThingsListProps) {
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }
   return (
      <Section>
         <div className="flex flex-col gap-0">
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
                     className="flex cursor-pointer items-center gap-2 border-b-2 p-4 transition-colors duration-300 hover:bg-[var(--bb-surface-a10)] md:gap-8"
                     onClick={() => handleItemClick(key)}>
                     {main_image_url && (
                        <div className="relative hidden h-10 w-10 overflow-hidden rounded-[50%] md:block md:h-20 md:w-20">
                           <Image
                              src={main_image_url}
                              alt={name}
                              fill
                              sizes="(max-width: 768px) 40px, 50px"
                              style={{ objectFit: 'cover' }}
                              loading="lazy"
                              className="transition-transform duration-300 md:hover:scale-105"
                           />
                        </div>
                     )}
                     <div>
                        <div className="mb-2 flex items-center gap-2">
                           {main_image_url && (
                              <div className="relative h-10 w-10 overflow-hidden rounded-[50%] md:hidden md:h-20 md:w-20">
                                 <Image
                                    src={main_image_url}
                                    alt={name}
                                    fill
                                    sizes="(max-width: 768px) 40px, 50px"
                                    style={{ objectFit: 'cover' }}
                                    loading="lazy"
                                    className="transition-transform duration-300 md:hover:scale-105"
                                 />
                              </div>
                           )}
                           <h3 className="text-lg">{name}</h3>
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-8">
                           {(hasRating || hasStatusText) && (
                              <div className="flex items-center gap-4">
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
                        </div>
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
