import Image from 'next/image';
import { Section } from '@/components/layout';
import { Rating } from '@/components/inputs';
import ThingInfoBar from './ThingInfoBar';
import { truncateString } from '@/utils/truncateString';
import { Thing } from '@/types/Thing';

export default function ThingsGrid({
   things,
   handleCardClick
}: {
   things: Thing[];
   handleCardClick: (thingId: string) => void;
}) {
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }
   return (
      <Section width="lg">
         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                     className="flex cursor-pointer flex-col items-center overflow-hidden rounded-lg border shadow-[-1px_4px_8px_0] shadow-black/70 transition-colors duration-300 hover:bg-[var(--bb-surface-a10)]"
                     onClick={() => handleCardClick(_id)}>
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
