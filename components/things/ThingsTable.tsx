import {
   useReactTable,
   ColumnDef,
   getCoreRowModel,
   getSortedRowModel,
   flexRender
} from '@tanstack/react-table';
import Image from 'next/image';
import { truncateString } from '@/utils/truncateString';

export default function ThingsTable({ things }: { things: any[] }) {
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
         }
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
      getSortedRowModel: getSortedRowModel()
   });

   return (
      <div>
         <table>
            <thead>
               {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map(header => (
                        <th
                           key={header.id}
                           onClick={header.column.getToggleSortingHandler()}
                           style={{ cursor: 'pointer' }}>
                           {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                           )}
                           {header.column.getIsSorted() === 'asc' && ' 🔼'}
                           {header.column.getIsSorted() === 'desc' && ' 🔽'}
                           {!header.column.getIsSorted() && ' ⬍'}
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody>
               {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
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
