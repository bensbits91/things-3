import Image from 'next/image';
import { Section } from '@/components/layout';
import { Rating } from '@/components/inputs';
import ThingInfoBar from './ThingInfoBar';
import { truncateString } from '@/utils/truncateString';
import { Thing } from '@/types/Thing';

interface ThingsWallProps {
   things: Thing[];
   handleItemClick: (thingId: string) => void;
}

export default function ThingsWall({
   things,
   handleItemClick
}: ThingsWallProps) {
   if (!things || things.length === 0) {
      return <p>No things found</p>;
   }
   return (
      <Section>
         <div className="grid max-w-xl grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-1 md:max-w-3xl md:auto-cols-min lg:max-w-5xl">
            {things.map(thing => {
               const { _id, name, main_image_url } = thing;
               if (!main_image_url) {
                  return null;
               }

               return (
                  <div
                     key={_id}
                     className="cursor-pointer"
                     onClick={() => handleItemClick(_id)}>
                     {main_image_url && (
                        <div className="relative h-20 w-10 overflow-hidden md:h-40 md:w-20">
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
