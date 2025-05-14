import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Thing, UpdateThingData } from '@/types/Thing';

export function useUpdateThing(userUuid: string) {
   const queryClient = useQueryClient();

   return useMutation<Thing, Error, UpdateThingData>({
      mutationFn: async (updatedThing: UpdateThingData) => {
         const { _id, ...data } = updatedThing;

         const response = await fetch(`/api/things/${_id}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         });

         if (!response.ok) {
            throw new Error('Failed to update thing');
         }

         return response.json();
      },
      onMutate: async (
         updatedThing
      ): Promise<{ previousThings: Thing[] | undefined }> => {
         // Cancel any outgoing queries for 'things' to avoid overwriting the optimistic update
         await queryClient.cancelQueries({ queryKey: ['things', userUuid] });

         // Snapshot the previous value
         const previousThings = queryClient.getQueryData<Thing[]>([
            'things',
            userUuid
         ]);

         // Optimistically update the cache
         queryClient.setQueryData(
            ['things', userUuid],
            (oldThings: Thing[] | undefined) => {
               if (!oldThings) return [];
               return oldThings.map(thing =>
                  thing._id === updatedThing._id
                     ? { ...thing, ...updatedThing }
                     : thing
               );
            }
         );

         // Return the snapshot so we can roll back if needed
         return { previousThings };
      },
      onError: (err, updatedThing, context) => {
         const typedContext = context as {
            previousThings: Thing[] | undefined;
         };
         // Roll back to the previous state if the mutation fails
         queryClient.setQueryData(
            ['things', userUuid],
            typedContext?.previousThings
         );
      },
      onSettled: () => {
         // Refetch the 'things' query to ensure the cache is in sync with the server
         queryClient.invalidateQueries({ queryKey: ['things', userUuid] });
      }
   });
}
