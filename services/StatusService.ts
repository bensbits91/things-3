import dbConnect from '@/lib/db';
import { Status } from '@/models/StatusModel';

interface StatusMap {
  [type: string]: { [code: number]: string };
}

export async function getStatusMap(): Promise<StatusMap> {
  let statusMap: StatusMap = {};
   try {
      await dbConnect();
      const statuses = await Status.find();
      statusMap = statuses.reduce((acc: StatusMap, { code, text, type }) => {
        if (!acc[type]) acc[type] = {};
        acc[type][code] = text;
        return acc;
      }, {});
      return statusMap;
     } catch (error) {
      console.error('Error fetching things for user:', error);
      throw new Error('Failed to fetch things for user');
   }
}



// let statusMap: StatusMap = {};

// export class StatusService {
//   // Load statuses from the database and populate the statusMap
//   static async loadStatuses(): Promise<void> {
//     await dbConnect();
    // const statuses = await Status.find();
    // statusMap = statuses.reduce((acc: StatusMap, { code, text, type }) => {
    //   if (!acc[type]) acc[type] = {};
    //   acc[type][code] = text;
    //   return acc;
    // }, {});
//   }

//   // Get the cached statusMap
//   static getStatusMap(): StatusMap {
//     return statusMap;
//   }
// }
