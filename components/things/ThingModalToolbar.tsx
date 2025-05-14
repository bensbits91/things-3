import { Toolbar } from '@radix-ui/react-toolbar';
import { Select, Number, Rating } from '@/components/inputs';
import { useGetStatusMap } from '@/hooks/statuses/useGetStatusMap';
import { useUpdateThing } from '@/hooks/things';
import { Thing } from '@/types/Thing';

interface ThingModalToolbarProps {
   thing: Thing; // Pass the full Thing object
   userUuid: string; // Pass the userUuid for cache updates
}

export default function ThingModalToolbar({
   thing,
   userUuid
}: ThingModalToolbarProps) {
   const { type, status, times, rating } = thing;

   // instantiate the updateThing hook with the userUuid
   const updateThing = useUpdateThing(userUuid);

   const { data: statusMap } = useGetStatusMap();
   const typeStatuses = type ? statusMap?.[type] : statusMap?.default;

   const handleNumberEdit = (value: string) => {
      console.log('Number edited:', value);
      updateThing.mutate({
         _id: thing._id,
         times: parseInt(value)
      });
   };

   const handleRatingEdit = (value: number) => {
      updateThing.mutate({
         _id: thing._id, // Use the Thing's ID
         rating: value // Update the rating
      });
   };
   const handleStatusEdit = (value: string) => {
      console.log('Status edited:', parseInt(value));
      updateThing.mutate({
         _id: thing._id,
         status: parseInt(value)
      });
   };

   return (
      <>
         <Toolbar
            orientation="horizontal"
            className="flex w-full min-w-max flex-col gap-4 rounded-md bg-[var(--bb-surface-a20)] p-2.5 shadow-[-1px_4px_8px_0] shadow-black/70 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
               <Select
                  options={typeStatuses}
                  initialSelection={status}
                  handleEdit={handleStatusEdit}
               />
               {times && <Number value={times} handleEdit={handleNumberEdit} />}
            </div>
            <Rating
               rating={rating || 0}
               editable={true}
               handleEdit={handleRatingEdit}
            />
         </Toolbar>
      </>
   );
}
