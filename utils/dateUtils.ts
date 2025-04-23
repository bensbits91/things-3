import dayjs from 'dayjs';

export const getYear = (date: string | Date) => {
   if (!date) {
      return null;
   }
   if (typeof date === 'string') {
      date = new Date(date);
   }
   return dayjs(date).format('YYYY');
};
