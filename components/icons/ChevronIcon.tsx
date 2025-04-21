import clsx from 'clsx';

const ChevronIcon = ({ direction = 'down' }) => (
   <div
      className={clsx(
         'transition-transform duration-500',
         direction === 'up' && 'rotate-180'
      )}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path
            d="M17 9.5L12 14.5L7 9.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
      </svg>
   </div>
);

export default ChevronIcon;
