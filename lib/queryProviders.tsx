'use client';
import type { DehydratedState } from '@tanstack/react-query';
import { hydrate, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';

export default function Providers({
   children,
   dehydratedState
}: {
   children: React.ReactNode;
   dehydratedState: DehydratedState;
}) {
   const [queryClient] = React.useState(() => new QueryClient());

   React.useEffect(() => {
      if (dehydratedState) {
         hydrate(queryClient, dehydratedState);
      }
   }, [dehydratedState]);

   return (
      <QueryClientProvider client={queryClient}>
         {children}
      </QueryClientProvider>
   );
}

// 'use client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactNode, useState } from 'react';

// export default function Providers({ children }: { children: ReactNode }) {
//    const [queryClient] = useState(() => new QueryClient());

//    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
// }
