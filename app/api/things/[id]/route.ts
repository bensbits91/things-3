import { NextResponse } from 'next/server';
import { updateThing } from '@/services/things';

export async function PATCH(req: Request, context: { params: { id: string } }) {
   const { id } = context.params; // Access the dynamic route parameter

   try {
      const body = await req.json(); // Parse the JSON body from the request
      const updatedThing = await updateThing({ ...body, _id: id }); // Map `id` to `_id`

      if (!updatedThing) {
         return NextResponse.json(
            { error: 'Thing not found' },
            { status: 404 }
         );
      }

      return NextResponse.json(updatedThing, { status: 200 }); // Return the updated "thing"
   } catch (error) {
      console.error('Error updating thing:', error);
      return NextResponse.json(
         { error: 'Failed to update thing' },
         { status: 500 }
      );
   }
}

export function OPTIONS() {
   return NextResponse.json(null, {
      headers: {
         Allow: 'PATCH'
      }
   });
}
