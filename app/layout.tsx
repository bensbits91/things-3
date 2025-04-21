import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NavMenu from '@/components/nav/NavMenu';
// import { StatusService } from '@/services/StatusService';
import QueryProvider from '@/components/QueryProviders';
// import { QueryClient, dehydrate } from '@tanstack/react-query';
import './globals.css';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin']
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin']
});

export const metadata: Metadata = {
   title: 'Things App 3.0',
   description: 'Track anything'
};

export default async function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode;
}>) {
   // const queryClient = new QueryClient();

   // Preload statuses on the server
   // await queryClient.prefetchQuery({
   //    queryKey: ['statuses'],
   //    queryFn: async () => {
   //       await StatusService.loadStatuses();
   //       return StatusService.getStatusMap();
   //    }
   // });

   // const dehydratedState = dehydrate(queryClient);

   return (
      <html lang='en'>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <header>
               <NavMenu />
            </header>
            <main>
               <div className='pt-12'>
                  <QueryProvider /*  dehydratedState={dehydratedState} */>
                     {children}
                  </QueryProvider>
               </div>
            </main>
         </body>
      </html>
   );
}
