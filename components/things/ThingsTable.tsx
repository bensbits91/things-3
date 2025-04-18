import {
   useReactTable,
   ColumnDef,
   getCoreRowModel,
   getSortedRowModel,
   getFilteredRowModel,
   flexRender
} from '@tanstack/react-table';
import Image from 'next/image';
import { truncateString } from '@/utils/truncateString';

export default function ThingsTable({
   things,
   handleRowClick
}: {
   things: any[];
   handleRowClick: (thingId: string) => void;
}) {
   interface Thing {
      name: string;
      description: string;
      main_image_url: string;
      country: string;
      date: string;
      rating: number;
      statusText: string;
   }

   interface CellInfo<TData, TValue> {
      getValue: () => TValue;
   }

   const columns: ColumnDef<Thing, string>[] = [
      {
         accessorKey: 'main_image_url',
         header: 'Image',
         cell: (info: CellInfo<Thing, string>) => {
            const imageUrl = info.getValue();
            return (
               <div className='w-12 h-12 relative overflow-hidden'>
                  <Image
                     src={imageUrl}
                     alt='Thing Image'
                     //  width={48}
                     //  height={48}
                     fill
                     sizes='48px' // todo: need response? sizes="(max-width: 768px) 100vw, 50px" // Full width on small screens, 50px on larger screens
                     style={{ objectFit: 'cover' }}
                     loading='lazy'
                     //  onError={(e) => {
                     //     e.currentTarget.src = '/fallback-image.jpg'; // Replace with your fallback image
                     //  }}
                  />
               </div>
            );
         },
         enableSorting: false, // Disable sorting for the image column
         enableColumnFilter: false // Disable filtering for the image column
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
         header: 'Rating'
      },
      {
         accessorKey: 'statusText',
         header: 'Status'
      },
      {
         accessorKey: 'description',
         header: 'Description',
         cell: (info: CellInfo<Thing, string>) => {
            const { newString, wasTruncated } = truncateString(info.getValue(), 50);
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
                              header.column.getCanSort() ? 'cursor-pointer' : 'align-top'
                           }
                           key={header.id}
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
                           {header.column.getCanFilter() && (
                              <input
                                 type='text'
                                 value={(header.column.getFilterValue() as string) || ''}
                                 onChange={e =>
                                    header.column.setFilterValue(e.target.value)
                                 }
                                 placeholder={`Filter ${header.column.columnDef.header}`}
                                 style={{ marginTop: '5px', width: '100%' }}
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
                     className='even:bg-[var(--bb-surface-a10)]'
                     onClick={() => {
                        handleRowClick(row.original._id);
                     }}>
                     {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
