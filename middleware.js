import { NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';
import { jwtDecode } from 'jwt-decode';

export async function middleware(request) {
   const authRes = await auth0.middleware(request);

   // authentication routes are handled by auth0
   if (request.nextUrl.pathname.startsWith('/auth')) {
      return authRes;
   }

   const { origin } = new URL(request.url);
   let session;
   try {
      session = await auth0.getSession(request);
   } catch (error) {
      console.error('Error retrieving session:', error);
      return NextResponse.redirect(`${origin}/auth/login`);
   }

   // no user session — redirect to login
   if (!session) {
      return NextResponse.redirect(`${origin}/auth/login`);
   }

   // add userUuid to session so it can be accessed by the client
   // note: userUuid is added to accessToken by an auth0 action
   const { accessToken } = session.tokenSet;
   const decodedAccessToken = jwtDecode(accessToken);
   const userUuid = decodedAccessToken['urn:bbThingsApp/userUuid'];
   await auth0.updateSession(request, authRes, {
      ...session,
      user: {
         ...session.user,
         userUuid
      }
   });

   return authRes;
}

export const config = {
   matcher: ['/((?!_next/static|_next/image|sitemap.xml|robots.txt).*)']
};
