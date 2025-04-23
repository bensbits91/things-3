import { ReactNode } from 'react';
import {
   useReactTable,
   ColumnDef,
   getCoreRowModel,
   getSortedRowModel,
   getFilteredRowModel,
   CellContext
} from '@tanstack/react-table';
import Image from 'next/image';
import Th from './ThingsTableHeader';
import Td from './ThingsTableCell';
import { Rating } from '@/components/inputs';
import { truncateString } from '@/utils/truncateString';
import { getYear } from '@/utils/dateUtils';
import { Thing } from '@/types/Thing';

interface ThingsTableProps {
   things: Thing[];
   handleItemClick: (thingId: string) => void;
}

const colsToHideOnMobile = ['country', 'description', 'date'];

export default function ThingsTable({
   things,
   handleItemClick
}: ThingsTableProps) {
   const columns: ColumnDef<
      Thing,
      string | unknown | number | Date | ReactNode
   >[] = [
      {
         accessorKey: 'main_image_url',
         header: 'Image',
         cell: (info: CellContext<Thing, unknown>) => {
            const imageUrl = info.getValue() as string;
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
         header: 'Date',
         cell: info => {
            return getYear(info.getValue() as string | Date);
         }
      },
      {
         accessorKey: 'rating',
         header: 'Rating',
         cell: info => (
            <div className="flex items-center gap-2">
               <Rating
                  rating={info.getValue() as number}
                  editable={false}
                  starSize="sm"
               />
            </div>
         )
      },
      {
         accessorKey: 'statusText',
         header: 'Status'
      },
      {
         accessorKey: 'description',
         header: 'Description',
         cell: (info: CellContext<Thing, unknown>) => {
            const { newString, wasTruncated } = truncateString(
               info.getValue() as string,
               50
            );
            return (
               <>
                  {wasTruncated ? (
                     <span title={info.getValue() as string}>{newString}</span>
                  ) : (
                     <span>{newString}</span>
                  )}
               </>
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
                        <Th
                           key={header.id}
                           header={header}
                           colsToHideOnMobile={colsToHideOnMobile}
                        />
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
                        handleItemClick(row.original._id);
                     }}>
                     {row.getVisibleCells().map(cell => (
                        <Td
                           key={cell.id}
                           cell={cell}
                           colsToHideOnMobile={colsToHideOnMobile}
                        />
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
