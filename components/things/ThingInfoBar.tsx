import { TypeIcon } from '@/components/icons';
import { getYear } from '@/utils/dateUtils';

interface ThingInfoBarProps {
   type?: string;
   date?: string;
   country?: string;
   language?: string;
   genres?: string[];
}

export default function ThingInfoBar({
   type,
   date,
   country,
   language,
   genres
}: ThingInfoBarProps) {
   const genreText = typeof genres === 'string' ? genres : genres?.join(', ');
   return (
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
         {type && (
            <div className="h-6 w-6" title={type}>
               <TypeIcon type={type} />
            </div>
         )}
         {date && <div>{getYear(date)}</div>}
         {country && <div>{country}</div>}
         {language && <div>{language}</div>}
         {genres && <div>{genreText}</div>}
      </div>
   );
}
