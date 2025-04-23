import { Cell, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';

interface TdProps<TData> {
   cell: Cell<TData, unknown>;
   colsToHideOnMobile: string[];
}

export default function Td<TData>({
   cell,
   colsToHideOnMobile
}: TdProps<TData>) {
   const hideOnMobile = colsToHideOnMobile.includes(cell.column.id);
   return (
      <td
         key={cell.id}
         className={clsx('p-2', hideOnMobile && 'hidden md:table-cell')}>
         {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
   );
}
