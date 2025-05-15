import { auth0 } from '@/lib/auth0';
import { ThingsView } from '@/views';

export default async function ThingsPage() {
   const session = await auth0.getSession();
   if (!session) {
      return (
         <div>
            <a href="/auth/login">Log in</a>
         </div>
      );
   }

   const {
      user: { userUuid }
   } = session;

   return <ThingsView userUuid={userUuid} />;
}
