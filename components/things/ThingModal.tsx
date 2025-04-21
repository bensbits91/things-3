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
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
}

export default function ThingModal({
   thing,
   isOpen,
   onOpenChange
}: ThingModalProps) {
   if (!thing) return null;
   const {
      name,
      main_image_url,
      description,
      status,
      times,
      type,
      date,
      language,
      country,
      genres,
      rating
   } = thing;

   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <Overlay className="fixed inset-0 bg-black/30" />
         <Content className="fixed top-16 right-4 bottom-4 left-4 overflow-scroll rounded-lg bg-[var(--modal-bg)] p-6 shadow-lg">
            <Close
               className="absolute top-4 right-4 h-4 w-4 cursor-pointer transition duration-500 ease-in-out hover:text-[yellow]"
               aria-label="Close"
               onClick={() => onOpenChange(false)}>
               <CloseIcon />
            </Close>
            <div className="flex h-full justify-between gap-12 p-4">
               <div className="relative h-full w-[500px] overflow-hidden">
                  {main_image_url && <Image
                     width={500}
                     height={500}
                     //  sizes='500px' // todo: need response? sizes="(max-width: 768px) 100vw, 50px" // Full width on small screens, 50px on larger screens
                     src={main_image_url}
                     alt={name}
                  />}
               </div>
               <div className="flex w-full flex-col gap-6">
                  <Title className="text-4xl">{name}</Title>
                  <ThingModalToolbar
                     status={status}
                     type={type}
                     times={times}
                     rating={rating}
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
