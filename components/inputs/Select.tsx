import { useState } from 'react';
import {
   Select,
   Trigger,
   Value,
   Icon,
   Portal,
   Content,
   ScrollUpButton,
   ScrollDownButton,
   Viewport,
   Item,
   ItemText,
   ItemIndicator
} from '@radix-ui/react-select';
import { SuccessIcon, ChevronIcon } from '@/components/icons';

// todo: show indicator for initial selected Item on load

interface SelectComponentProps {
   options?: object[];
   initialSelection?: number;
   handleEdit?: (value: string) => void;
}

export default function SelectComponent({
   options,
   initialSelection,
   handleEdit
}: SelectComponentProps) {
   const [isOpen, setIsOpen] = useState(false);
   const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
   };

   const Items = () => (
      <>
         {options &&
            Object.keys(options)?.map(optionKey => {
               const text = String(options[parseInt(optionKey)]);
               return (
                  <Item key={optionKey} value={optionKey}>
                     <div className="flex cursor-pointer items-center gap-2 px-4 py-1 hover:bg-[var(--bb-surface-a10)]">
                        <ItemText>{text}</ItemText>
                        <ItemIndicator>
                           <div className="h-4 w-4">
                              <SuccessIcon />
                           </div>
                        </ItemIndicator>
                     </div>
                  </Item>
               );
            })}
      </>
   );

   return (
      <Select onOpenChange={handleOpenChange} onValueChange={handleEdit} value={String(initialSelection)}>
         <Trigger className="flex cursor-pointer focus-visible:outline-none">
            <Value
               placeholder={String(
                  options && initialSelection
                     ? options[initialSelection]
                     : 'Pick a status'
               )}
            />
            <Icon asChild>
               <div className="h-6 w-6">
                  <ChevronIcon direction={isOpen ? 'up' : 'down'} />
               </div>
            </Icon>
         </Trigger>

         <Portal>
            <Content
               position="popper"
               className="z-30 bg-[var(--bb-surface-a20)] py-2">
               <ScrollUpButton />
               <Viewport>
                  <Items />
               </Viewport>
               <ScrollDownButton />
            </Content>
         </Portal>
      </Select>
   );
}
