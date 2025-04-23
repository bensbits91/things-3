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
import { Thing } from '@/types/Thing';
import clsx from 'clsx';

interface ThingsTableProps {
   things: Thing[];
   handleItemClick: (thingId: string) => void;
}

export default function ThingsTable({
   things,
   handleItemClick
}: ThingsTableProps) {
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
         header: 'Country',
         cell: info => {
            return <div className="hidden md:block">{info.getValue()}</div>;
         }
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

   const colsToHideOnMobile = ['country', 'description', 'date'];

   return (
      <div>
         <table>
            <thead>
               {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map(header => {
                        console.log('Header:', header);
                        const hideOnMobile = colsToHideOnMobile.includes(
                           header.id
                        );
                        return (
                           <th
                              className={clsx(
                                 header.column.getCanSort()
                                    ? 'cursor-pointer align-top'
                                    : 'align-top',
                                 hideOnMobile && 'hidden md:table-cell'
                              )}
                              key={header.id}>
                              <div
                                 onClick={header.column.getToggleSortingHandler()}>
                                 {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                 )}
                                 {header.column.getIsSorted() === 'asc' &&
                                    ' 🔼'}
                                 {header.column.getIsSorted() === 'desc' &&
                                    ' 🔽'}
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
                        );
                     })}
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
                     {row.getVisibleCells().map(cell => {
                        console.log(
                           'bb ~ ThingsTable.tsx:180 ~ {row.getVisibleCells ~ cell:',
                           cell
                        );
                        const hideOnMobile = colsToHideOnMobile.includes(
                           cell.column.id
                        );
                        return (
                           <td
                              key={cell.id}
                              className={clsx(
                                 'p-2',
                                 hideOnMobile && 'hidden md:table-cell'
                              )}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </td>
                        );
                     })}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
