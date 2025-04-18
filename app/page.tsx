import { auth0 } from '@/lib/auth0';

export default async function Home() {
   const session = await auth0.getSession(); // todo: should this be moved up to layout.js?
   console.log('bb ~ page.tsx:5 ~ Home ~ session:', session);
   if (!session) {
      return (
         <div>
            <a href='/auth/login'>Log in</a>
         </div>
      );
   }

   const {
      user: { email, nickname, username, picture } // todo: add username to app_metadata
   } = session;

   return (
      <div>
         <div>
            <p>
               Hey
               {picture && (
                  <img
                     src={picture}
                     alt={nickname}
                     width={25}
                     height={25}
                     style={{ marginLeft: 4, marginRight: 4 }}
                  />
               )}
               {nickname || email}
            </p>
            <a href='/auth/logout'>Log out</a>
         </div>
      </div>
   );
}
