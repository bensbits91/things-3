import { TypeIcon } from '@/components/icons';

interface ThingModalInfoBarProps {
   type?: string;
   date?: string;
   country?: string;
   language?: string;
   genres?: string[];
}

export default function ThingModalInfoBar({
   type,
   date,
   country,
   language,
   genres
}: ThingModalInfoBarProps) {
   const genreText = typeof genres === 'string' ? genres : genres?.join(', ');
   return (
      <div className='flex items-center gap-8'>
         {type && (
            <div className='h-6 w-6' title={type}>
               <TypeIcon type={type} />
            </div>
         )}
         {date && <div>{date}</div>}
         {country && <div>{country}</div>}
         {language && <div>{language}</div>}
         {genres && <div>{genreText}</div>}
      </div>
   );
}
