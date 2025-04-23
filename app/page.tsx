import { auth0 } from '@/lib/auth0';
import Image from 'next/image';

export default async function Home() {
   const session = await auth0.getSession();
   if (!session) {
      return (
         <div>
            <a href="/auth/login">Log in</a>
         </div>
      );
   }

   const {
      user: { email, nickname, picture } // todo: add username to app_metadata
   } = session;

   return (
      <div>
         <div>
            <p>
               Hey {nickname || email}
               {picture && (
                  <Image
                     src={picture}
                     alt={nickname || 'User'}
                     width={50}
                     height={50}
                  />
               )}
            </p>
            <a href="/auth/logout">Log out</a>
         </div>
      </div>
   );
}
