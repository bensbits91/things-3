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

export default function ThingModal({
   thing,
   isOpen,
   onOpenChange
}: {
   thing: any;
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
}) {
   if (!thing) return null;

   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <Overlay className='fixed inset-0 bg-black/30' />
         <Content className='fixed top-16 bottom-4 left-4 right-4 p-6 bg-[var(--modal-bg)] rounded-lg shadow-lg overflow-scroll'>
            <Close
               className='absolute top-4 right-4 hover:text-[yellow] w-4 h-4'
               aria-label='Close'
               onClick={() => onOpenChange(false)}>
               <CloseIcon />
            </Close>
            <div className='flex justify-between gap-12 p-4 h-full'>
               <div className='w-[500px] h-full relative overflow-hidden'>
                  <Image
                     width={500}
                     height={500}
                     //  sizes='500px' // todo: need response? sizes="(max-width: 768px) 100vw, 50px" // Full width on small screens, 50px on larger screens
                     src={thing.main_image_url}
                     alt={thing.name}
                  />
               </div>
               <div>
                  <Title className='text-xl font-bold'>{thing.name}</Title>
                  <Description className='mt-2'>{thing.description}</Description>
               </div>
            </div>
         </Content>
      </Dialog>
   );
}
