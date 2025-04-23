import { Header, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';

interface ThProps<TData> {
   header: Header<TData, unknown>;
   colsToHideOnMobile: string[];
}

export default function Th<TData>({
   header,
   colsToHideOnMobile
}: ThProps<TData>) {
   const hideOnMobile = colsToHideOnMobile.includes(header.id);

   return (
      <th
         className={clsx(
            header.column.getCanSort()
               ? 'cursor-pointer align-top'
               : 'align-top',
            hideOnMobile && 'hidden md:table-cell'
         )}
         key={header.id}>
         <div onClick={header.column.getToggleSortingHandler()}>
            {header.isPlaceholder
               ? null
               : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                 )}
            {header.column.getIsSorted() === 'asc' && ' 🔼'}
            {header.column.getIsSorted() === 'desc' && ' 🔽'}
            {header.column.getCanSort() && !header.column.getIsSorted() && ' ⬍'}
         </div>
         {header.column.getCanFilter() && (
            <input
               className="mt-2 w-full"
               type="text"
               value={(header.column.getFilterValue() as string) || ''}
               onChange={e => {
                  header.column.setFilterValue(e.target.value);
               }}
               placeholder={`Filter ${header.column.columnDef.header}`}
            />
         )}
      </th>
   );
}
