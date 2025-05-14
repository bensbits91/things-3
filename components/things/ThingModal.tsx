import { useQueryClient } from '@tanstack/react-query';
import {
   Dialog,
   Overlay,
   Content,
   Title,
   Description,
   Close
} from '@radix-ui/react-dialog';
import Image from 'next/image';
import { CloseIcon } from '@/components/icons';
import ThingModalToolbar from './ThingModalToolbar';
import ThingInfoBar from './ThingInfoBar';
import { Thing } from '@/types/Thing';

interface ThingModalProps {
   thing: Thing | null | undefined;
   userUuid: string;
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
}

export default function ThingModal({
   thing,
   userUuid,
   isOpen,
   onOpenChange
}: ThingModalProps) {
   const queryClient = useQueryClient();

   if (!thing) return null;

   // Get the updated Thing from the cache
   const cachedThing = queryClient
      .getQueryData<Thing[]>(['things', userUuid])
      ?.find(t => t._id === thing._id);

   const {
      name,
      main_image_url,
      description,
      // status,
      // times,
      type,
      date,
      language,
      country,
      genres
      // rating
   } = thing;

   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <Overlay className="fixed inset-0 bg-black/30" />
         <Content className="fixed top-4 right-4 bottom-4 left-4 z-20 overflow-scroll rounded-lg bg-[var(--modal-bg)] p-6 shadow-lg md:top-16">
            <Close
               className="absolute top-4 right-4 h-4 w-4 cursor-pointer transition duration-500 ease-in-out hover:text-[yellow]"
               aria-label="Close"
               onClick={() => onOpenChange(false)}>
               <CloseIcon />
            </Close>
            <div className="flex h-full flex-col justify-between gap-4 pt-4 md:flex-row md:gap-12 md:p-4">
               <div className="relative h-full overflow-hidden md:w-[500px]">
                  {main_image_url && (
                     <Image
                        width={500}
                        height={500}
                        sizes="(max-width: 768px) 100vw, 500px"
                        src={main_image_url}
                        alt={name}
                     />
                  )}
               </div>
               <div className="flex w-full flex-col gap-6">
                  <Title className="text-4xl">{name}</Title>
                  <ThingModalToolbar
                     thing={cachedThing || thing}
                     userUuid={userUuid}
                  />
                  <ThingInfoBar
                     type={type}
                     date={date}
                     country={country}
                     language={language}
                     genres={genres}
                  />
                  <Description className="mt-2">{description}</Description>
               </div>
            </div>
         </Content>
      </Dialog>
   );
}
