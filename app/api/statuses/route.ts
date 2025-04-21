import { NextResponse } from 'next/server';
import { getStatusMap } from '@/services/StatusService';

export async function GET(req: Request) {
try {
      const statuses = await getStatusMap();
      return NextResponse.json(statuses, { status: 200 });
   } catch (error) {
      console.error('Error fetching statuses:', error);
      return NextResponse.json(
         { error: 'Failed to fetch statuses' },
         { status: 500 }
      );
   }
}
