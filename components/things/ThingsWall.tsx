import Image from 'next/image';
import { Section } from '@/components/layout';
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
         <div className="grid max-w-screen grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-0 auto-cols-min md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] lg:max-w-5xl">
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
