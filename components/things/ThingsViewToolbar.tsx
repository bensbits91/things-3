import {
   Toolbar,
   Button,
   Separator,
   ToggleGroup,
   ToggleItem
} from '@radix-ui/react-toolbar';
import { TableIcon, GridIcon, ListIcon, WallIcon } from '@/components/icons';
import clsx from 'clsx';

interface ThingsViewToolbarProps {
   handleViewClick: (newView: 'table' | 'grid' | 'list' | 'wall') => void;
   selectedView: 'table' | 'grid' | 'list' | 'wall';
}

export default function ThingsViewToolbar({
   handleViewClick,
   selectedView
}: ThingsViewToolbarProps) {
   return (
      <Toolbar
         orientation="horizontal"
         className="flex w-full min-w-max items-center gap-4 rounded-md bg-[var(--bb-surface-a20)] p-2.5 shadow-[-1px_4px_8px_0] shadow-black/70">
         <ToggleGroup
            type="multiple"
            defaultValue={['table']}
            className="flex gap-2">
            <ToggleItem asChild value="table" aria-label="Table view">
               <Button
                  onClick={() => handleViewClick('table')}
                  className={clsx(
                     'h-4 w-4 cursor-pointer rounded-md hover:text-yellow-500',
                     selectedView === 'table' && 'text-yellow-500'
                  )}
                  title="Table view">
                  <TableIcon />
               </Button>
            </ToggleItem>
            <ToggleItem asChild value="grid" aria-label="Grid view">
               <Button
                  onClick={() => handleViewClick('grid')}
                  className={clsx(
                     'h-4 w-4 cursor-pointer rounded-md hover:text-yellow-500',
                     selectedView === 'grid' && 'text-yellow-500'
                  )}
                  title="Grid view">
                  <GridIcon />
               </Button>
            </ToggleItem>
            <ToggleItem asChild value="list" aria-label="List view">
               <Button
                  onClick={() => handleViewClick('list')}
                  className={clsx(
                     'h-4 w-4 cursor-pointer rounded-md hover:text-yellow-500',
                     selectedView === 'list' && 'text-yellow-500'
                  )}
                  title="List view">
                  <ListIcon />
               </Button>
            </ToggleItem>
            <ToggleItem asChild value="wall" aria-label="Wall view">
               <Button
                  onClick={() => handleViewClick('wall')}
                  className={clsx(
                     'h-4 w-4 cursor-pointer rounded-md hover:text-yellow-500',
                     selectedView === 'wall' && 'text-yellow-500'
                  )}
                  title="Wall view">
                  <WallIcon />
               </Button>
            </ToggleItem>
         </ToggleGroup>
         <Separator />
      </Toolbar>
   );
}
