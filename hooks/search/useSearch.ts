'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SearchDocument } from '@/types/Search';

const useSearch = () => {
   const initialFormData = { term: '' };
   const [formData, setFormData] = useState({ ...initialFormData });

   const queryClient = useQueryClient();

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prevData: typeof initialFormData) => ({
         ...prevData,
         [name]: value
      }));
   };

   interface ErrorData {
      message?: string;
      [key: string]: unknown;
   }

   const searchMutation = useMutation<SearchDocument, Error, string>({
      mutationFn: async (term: string): Promise<SearchDocument> => {
         const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ term })
         });

         if (!response.ok) {
            const errorData: ErrorData = await response.json();
            throw new Error(
               errorData.message || 'Failed to fetch search results'
            );
         }

         return response.json() as Promise<SearchDocument>;
      },
      onSuccess: data => {
         console.log('Mutation response:', data); // Log mutation response
         queryClient.setQueryData(['search', 'current'], data); // Update the cache
         console.log(
            'Updated cache:',
            queryClient.getQueryData(['search', 'current'])
         ); // Log updated cache
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['search', 'current'] }); // Trigger a refetch
      },
      onError: (error: Error) => {
         console.error('Error submitting search:', error);
      }
   });

   const { data: cachedResults } = useQuery<SearchDocument | null>({
      queryKey: ['search', 'current'],
      queryFn: async (): Promise<SearchDocument | null> => {
         const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ term: formData.term })
         });

         if (!response.ok) {
            const errorData: ErrorData = await response.json();
            throw new Error(
               errorData.message || 'Failed to fetch search results'
            );
         }

         return response.json() as Promise<SearchDocument>;
      },
      enabled: !!formData.term // Only run the query if a search term exists
   });

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent the default form submission behavior

      // Extract the term from the form data
      const formData = new FormData(event.currentTarget);
      const term = formData.get('term') as string;

      if (term) {
         searchMutation.mutate(term); // Trigger the mutation with the search term
      }
   };

   return {
      formData,
      results:
         cachedResults?.results ||
         (searchMutation.data as SearchDocument)?.results, // Flatten the results
      isSearching: searchMutation.isPending,
      errorData: searchMutation.error,
      handleChange,
      handleSubmit
   };
};

export default useSearch;
