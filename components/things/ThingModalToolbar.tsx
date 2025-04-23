import { Toolbar } from '@radix-ui/react-toolbar';
import { Select, Number, Rating } from '@/components/inputs';
import { useGetStatusMap } from '@/hooks/statuses/useGetStatusMap';

interface ThingModalToolbarProps {
   type?: string;
   status?: number;
   times?: number;
   rating?: number;
}

export default function ThingModalToolbar({
   type,
   status,
   times,
   rating
}: ThingModalToolbarProps) {
   const { data: statusMap } = useGetStatusMap();
   const typeStatuses = type ? statusMap?.[type] : statusMap?.default;

   const handleNumberEdit = (value: string) => {
      console.log('Number edited:', value);
   };

   const hasRating = typeof rating === 'number' && rating > 0;

   return (
      <>
         <Toolbar
            orientation="horizontal"
            className="flex w-full min-w-max flex-col gap-4 rounded-md bg-[var(--bb-surface-a20)] p-2.5 shadow-[-1px_4px_8px_0] shadow-black/70 md:flex-row md:items-center">
            <div className='flex items-center gap-4'>
               <Select options={typeStatuses} initialSelection={status} />
               {times && <Number value={times} handleEdit={handleNumberEdit} />}
            </div>
            {hasRating && (
               <Rating
                  rating={rating}
                  editable={true}
                  handleEdit={value => console.log('Rating edited:', value)}
               />
            )}
         </Toolbar>
      </>
   );
}
