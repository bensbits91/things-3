import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionProps {
   children: ReactNode;
   width?: 'sm' | 'md' | 'lg';
   top?: 'sm' | 'md' | 'lg' | 'xl';
   bottom?: 'sm' | 'md' | 'lg';
   bg?: string;
   fullheight?: boolean;
}

const Section = ({
   children,
   width = 'md',
   top = 'md',
   bottom = 'md',
   bg = 'transparent',
   fullheight = false
}: SectionProps) => {
   return (
      <section
         className={clsx('px-5', {
            'bg-transparent': bg === 'transparent',
            [`bg-gradient-${bg}`]: bg !== 'transparent', // todo: define and whitelist gradient colors
            'min-h-screen flex-col content-center py-0': fullheight,
            'h-auto': !fullheight,
            'pt-1': top === 'sm',
            'pt-4': top === 'md',
            'pt-20 md:pt-32': top === 'lg',
            'pt-32 md:pt-48': top === 'xl',
            'pb-1': bottom === 'sm',
            'pb-20 md:pb-32': bottom === 'lg',
            'pb-4': bottom === 'md'
         })}>
         <div
            className={clsx('container mx-auto', {
               'max-w-[640px]': width === 'sm',
               'max-w-[960px]': width === 'md',
               'max-w-[1280px]': width === 'lg'
            })}>
            {children}
         </div>
      </section>
   );
};

export default Section;
