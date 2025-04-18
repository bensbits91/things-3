import { NextResponse } from 'next/server';
import { createThing, getThingsByUser } from '@/services/ThingService';

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const userUuid = searchParams.get('user_uuid');
   console.log('bb ~ route.ts:7 ~ GET ~ userUuid:', userUuid);

   if (!userUuid) {
      return NextResponse.json({ error: 'user_uuid is required' }, { status: 400 });
   }

   try {
      const things = await getThingsByUser(userUuid);
      // console.log('bb ~ route.ts:15 ~ GET ~ things:', things);
      return NextResponse.json(things, { status: 200 });
   } catch (error) {
      console.error('Error fetching things for user:', error);
      return NextResponse.json(
         { error: 'Failed to fetch things for user' },
         { status: 500 }
      );
   }
}
export async function POST(req: Request) {
   try {
      const body = await req.json(); // Parse the JSON body from the request
      const thing = await createThing(body); // Call the service to create a "thing"
      return NextResponse.json(thing, { status: 201 }); // Return the created "thing" with a 201 status
   } catch (error) {
      console.error('Error creating thing:', error);
      return NextResponse.json({ error: 'Failed to create thing' }, { status: 500 });
   }
}

// Handle unsupported methods (optional)
export function OPTIONS() {
   return NextResponse.json(null, {
      headers: {
         Allow: 'POST'
      }
   });
}
