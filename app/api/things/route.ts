import { NextResponse } from 'next/server';
import { createThing, getThingsByUser } from '@/services/things';

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const userUuid = searchParams.get('user_uuid');
   console.log('bb ~ route.ts:7 ~ GET ~ userUuid:', userUuid);

   if (!userUuid) {
      return NextResponse.json(
         { error: 'user_uuid is required' },
         { status: 400 }
      );
   }

   try {
      const things = await getThingsByUser(userUuid);
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
      return NextResponse.json(
         { error: 'Failed to create thing' },
         { status: 500 }
      );
   }
}

// export async function PATCH(req: Request) {
//    try {
//       const body = await req.json(); // Parse the JSON body from the request
//       const { _id, ...updates } = body; // Extract the ID and other fields

//       if (!_id) {
//          return NextResponse.json(
//             { error: '_id is required' },
//             { status: 400 }
//          );
//       }

//       const updatedThing = await updateThing({ _id, ...updates }); // Call the service to update the "thing"

//       if (!updatedThing) {
//          return NextResponse.json(
//             { error: 'Thing not found' },
//             { status: 404 }
//          );
//       }

//       return NextResponse.json(updatedThing, { status: 200 }); // Return the updated "thing"
//    } catch (error) {
//       console.error('Error updating thing:', error);
//       return NextResponse.json(
//          { error: 'Failed to update thing' },
//          { status: 500 }
//       );
//    }
// }

// Handle unsupported methods
export function OPTIONS() {
   return NextResponse.json(null, {
      headers: {
         Allow: 'GET, POST'
      }
   });
}
