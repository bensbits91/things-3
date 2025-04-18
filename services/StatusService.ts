import { Status } from '@/models/StatusModel';
import dbConnect from '@/lib/db';

interface StatusMap {
  [type: string]: { [code: number]: string };
}

let statusMap: StatusMap = {};

export class StatusService {
  // Load statuses from the database and populate the statusMap
  static async loadStatuses(): Promise<void> {
    await dbConnect();
    const statuses = await Status.find();
    statusMap = statuses.reduce((acc: StatusMap, { code, text, type }) => {
      if (!acc[type]) acc[type] = {};
      acc[type][code] = text;
      return acc;
    }, {});
  }

  // Get the cached statusMap
  static getStatusMap(): StatusMap {
    return statusMap;
  }
}