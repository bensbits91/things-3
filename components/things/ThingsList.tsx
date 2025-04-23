import Image from 'next/image';
import { Section } from '@/components/layout';
import { Rating } from '@/components/inputs';
import ThingInfoBar from './ThingInfoBar';
import { truncateString } from '@/utils/truncateString';
import { Thing } from '@/types/Thing';

interface ThingsListProps {
   things: Thing[];
   handleItemClick: (thingId: string) => void;
}

export default function ThingsList({
   things,
   handleItemClick
}: ThingsListProps) {
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }
   return (
      <Section>
         <div className="flex flex-col gap-0">
            {things.map(thing => {
               const {
                  _id,
                  name,
                  main_image_url,
                  description,
                  rating,
                  statusText,
                  type,
                  date,
                  country,
                  language,
                  genres
               } = thing;
               if (!name) {
                  return null;
               }

               const hasRating = typeof rating === 'number' && rating > 0;
               const hasStatusText = statusText && statusText !== 'Unset';

               return (
                  <div
                     key={_id}
                     className="flex cursor-pointer items-center gap-2 border-b-2 p-4 transition-colors duration-300 hover:bg-[var(--bb-surface-a10)] md:gap-8"
                     onClick={() => handleItemClick(_id)}>
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
                        <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-8">
                           <div className="flex items-center gap-2">
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
