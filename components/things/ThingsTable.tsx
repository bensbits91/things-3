import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

export default function ThingsTable({ things }: { things: any[] }) {
   const columns = [
      {
         accessorKey: 'name',
         header: 'Name'
      },
      {
         accessorKey: 'description',
         header: 'Description'
      }
   ];

   const table = useReactTable({
      data: things,
      columns,
      getCoreRowModel: getCoreRowModel()
   });

   return (
      <div>
         <table>
            <thead>
               {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map(column => (
                        <th key={column.id}>
                           {typeof column.column.columnDef.header === 'function'
                              ? column.column.columnDef.header({
                                   column: column.column,
                                   header: column,
                                   table
                                })
                              : column.column.columnDef.header}
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody>
               {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                     {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{cell.renderValue() as React.ReactNode}</td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
