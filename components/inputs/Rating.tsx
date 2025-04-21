import { useState } from 'react';
import { StarIcon } from '@/components/icons';
import clsx from 'clsx';

interface RatingProps {
   rating: number;
   editable?: boolean;
   handleEdit?: (value: number) => void;
   starSize?: string;
}

const Rating = ({
   rating,
   editable = false,
   handleEdit,
   starSize
}: RatingProps) => {
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

   const handleMouseEnter = (index: number): void => {
      setHoveredIndex(index);
   };

   const handleMouseLeave = () => {
      setHoveredIndex(null);
   };

   const handleClick = (index: number): void => {
      if (handleEdit) {
         handleEdit(index + 1);
      }
   };

   const Stars = [];
   for (let i = 0; i < 10; i++) {
      const isFilled =
         editable && hoveredIndex !== null ? i <= hoveredIndex : rating > i;

      if (editable || (!editable && rating > i)) {
         Stars.push(
            <div
               key={`star-${i}`}
               className={clsx(
                  starSize === 'sm' ? 'h-2 w-2' : 'h-4 w-4',
                  isFilled ? 'text-[yellow]' : ''
               )}
               onMouseEnter={() => handleMouseEnter(i)}
               onMouseLeave={handleMouseLeave}
               onClick={() => handleClick(i)}>
               <StarIcon fill={isFilled} />
            </div>
         );
      }
   }

   return (
      <div
         className={clsx(
            'flex items-center gap-1',
            editable ? 'cursor-pointer' : ''
         )}>
         {Stars}
      </div>
   );
};

export default Rating;
