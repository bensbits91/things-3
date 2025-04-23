// todo: not sure if we need this HOC -- deleted if unused
import { auth0 } from '@/lib/auth0';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function withAuth<P extends React.Attributes>(Component: React.ComponentType<P>) {
   return function ProtectedComponent(props: P) {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const router = useRouter();

      useEffect(() => {
         async function checkAuth() {
            const session = await auth0.getSession();
            if (!session) {
               router.push('/auth/login');
            } else {
               setIsAuthenticated(true);
            }
         }
         checkAuth();
      }, [router]);

      if (!isAuthenticated) {
         return <p>Loading...</p>;
      }

      return <Component {...props} />;
   };
}
