// import { HeadingTwo } from '@/app/components/typography';

const ThreeColumnSection = ({ heading = '', columns }) => {
   return (
      <>
         <section className="container mx-auto max-w-[1200px] mb-20 md:mb-32">
            {/* {heading && (
               <div className="pl-10 md:pl-20">
                  <HeadingTwo>{heading}</HeadingTwo>
               </div>
            )} */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
               {columns.map((column, index) => {
                  const isFirstOfThree = index % 3 === 0;
                  const isLastOfThree = index % 3 === 2;
                  const outsidePadding = isFirstOfThree
                     ? ' lg:pl-10'
                     : isLastOfThree
                       ? ' lg:pr-10'
                       : '';

                  return (
                     <div key={index} className={`px-5 mb-10${outsidePadding}`}>
                        {column.content}
                     </div>
                  );
               })}
            </div>
         </section>
      </>
   );
};

export default ThreeColumnSection;
