import {
   useReactTable,
   ColumnDef,
   getCoreRowModel,
   getSortedRowModel,
   getFilteredRowModel,
   flexRender
} from '@tanstack/react-table';
import Image from 'next/image';
import { Rating } from '@/components/inputs';
import { truncateString } from '@/utils/truncateString';

interface Thing {
   _id: string;
   name: string;
   description: string;
   main_image_url: string;
   country: string;
   date: string;
   rating: number;
   statusText: string;
}

export default function ThingsTable({
   things,
   handleRowClick
}: {
   things: Thing[];
   handleRowClick: (thingId: string) => void;
}) {
   interface CellInfo<TData, TValue> {
      getValue: () => TValue;
   }

   const columns: ColumnDef<Thing, any>[] = [
      {
         accessorKey: 'main_image_url',
         header: 'Image',
         cell: (info: CellInfo<Thing, string>) => {
            const imageUrl = info.getValue();
            return (
               <div className="relative h-12 w-12 overflow-hidden">
                  <Image
                     src={imageUrl}
                     alt="Thing Image"
                     fill
                     sizes="48px" // todo: need response? sizes="(max-width: 768px) 100vw, 50px" // Full width on small screens, 50px on larger screens
                     style={{ objectFit: 'cover' }}
                     loading="lazy"
                     //  onError={(e) => {
                     //     e.currentTarget.src = '/fallback-image.jpg'; // Replace with your fallback image
                     //  }}
                  />
               </div>
            );
         },
         enableSorting: false,
         enableColumnFilter: false
      },
      {
         accessorKey: 'name',
         header: 'Name'
      },
      {
         accessorKey: 'country',
         header: 'Country'
      },
      {
         accessorKey: 'date',
         header: 'Date'
      },
      {
         accessorKey: 'rating',
         header: 'Rating',
         cell: info => {
            const rating = info.getValue();
            return (
               <div className="flex items-center gap-2">
                  <Rating rating={rating} editable={false} starSize="sm" />
               </div>
            );
         }
      },
      {
         accessorKey: 'statusText',
         header: 'Status'
      },
      {
         accessorKey: 'description',
         header: 'Description',
         cell: (info: CellInfo<Thing, string>) => {
            const { newString, wasTruncated } = truncateString(
               info.getValue(),
               50
            );
            return (
               <div>
                  {wasTruncated ? (
                     <span title={info.getValue()}>{newString}</span>
                  ) : (
                     <span>{newString}</span>
                  )}
               </div>
            );
         }
      }
   ];

   const table = useReactTable({
      data: things,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel() // needed for client-side filtering
   });

   return (
      <div>
         <table>
            <thead>
               {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map(header => (
                        <th
                           className={
                              header.column.getCanSort()
                                 ? 'cursor-pointer'
                                 : 'align-top'
                           }
                           key={header.id}>
                           <div
                              onClick={header.column.getToggleSortingHandler()}>
                              {flexRender(
                                 header.column.columnDef.header,
                                 header.getContext()
                              )}
                              {header.column.getIsSorted() === 'asc' && ' 🔼'}
                              {header.column.getIsSorted() === 'desc' && ' 🔽'}
                              {header.column.getCanSort() &&
                                 !header.column.getIsSorted() &&
                                 ' ⬍'}
                           </div>
                           {header.column.getCanFilter() && (
                              <input
                                 className="mt-2 w-full"
                                 type="text"
                                 value={
                                    (header.column.getFilterValue() as string) ||
                                    ''
                                 }
                                 onChange={e => {
                                    header.column.setFilterValue(
                                       e.target.value
                                    );
                                 }}
                                 placeholder={`Filter ${header.column.columnDef.header}`}
                              />
                           )}
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody>
               {table.getRowModel().rows.map(row => (
                  <tr
                     key={row.id}
                     className="border-y-solid cursor-pointer border-t-2 border-b-0 border-transparent odd:bg-[var(--bb-surface-a10)] hover:border-b-2 hover:border-y-yellow-200"
                     onClick={() => {
                        handleRowClick(row.original._id);
                     }}>
                     {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="p-2">
                           {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                           )}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
