import { RepeatIcon } from '@/components/icons';

interface NumberInputProps {
   value: number;
   handleEdit: (value: string) => void;
}

const NumberInput = ({ value, handleEdit }: NumberInputProps) => {
   return (
      <div
         className='flex items-center gap-2 cursor-pointer'
         title="Times you've completed this">
         <label htmlFor='times' className='h-4 w-4'>
            <RepeatIcon />
         </label>
         <input
            className='w-16'
            type='number'
            name='times'
            id='times'
            value={value}
            min='0'
            step='1'
            onChange={e => handleEdit(e.target.value)}
         />
      </div>
   );
};

export default NumberInput;
