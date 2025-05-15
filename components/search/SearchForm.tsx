'use client';
import { useEffect } from 'react';
import { useSearch } from '@/hooks/search';

// TODO: input validation

export default function SearchForm() {
   const {
      formData,
      isSearching,
      results,
      errorData,
      handleChange,
      handleSubmit
   } = useSearch();
   useEffect(() => {
      // todo: remove this
      if (results) {
         console.log('bb ~ SearchForm.tsx:25 ~ SearchForm ~ results:', results);
      }
   }, [results]);

   const SearchingComponent = () => (
      <div className="dark-text flex flex-col items-center gap-4">
         Searching...
         {/* <Loading message="Searching..." /> */}
      </div>
   );

   const ErrorComponent = ({ error }: { error: unknown | null }) => (
      <div
         role="alert"
         aria-live="assertive"
         className="flex flex-col items-center gap-4">
         <p>Error: {JSON.stringify(error)}</p>
      </div>
   );

   return (
      <>
         <form
            className="flex flex-col items-center justify-center gap-4"
            onSubmit={handleSubmit}>
            <label
               htmlFor="term"
               className="text-lg font-semibold text-gray-700">
               Search for something:
            </label>
            <input
               onChange={handleChange}
               value={formData.term}
               name="term"
               type="text"
               placeholder="Search..."
               className="w-full max-w-md rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
               type="submit"
               className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
               Search
            </button>
         </form>
         {isSearching && <SearchingComponent />}
         {errorData && <ErrorComponent error={errorData} />}
      </>
   );
}
