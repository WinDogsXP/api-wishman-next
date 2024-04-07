interface AppInfo {
  id: string;
  userId: string;
  name: string;
  isBugged?: boolean;
  description?: string;
  hours?: number;
  reportEmail?: string;
  status?: "Stable" | "Unstable" | "Down";
  endpoint?: Endpoint[];
  lastUpdate?: Date;
}
interface Endpoint {
  id: string;
  method: string;
  name: string;
  url: string;

  status?: string;
  appId?: string;
  headers?: string;
  body?: string;
  interval?: number;
}

interface BugInfo {
  appId: string;
  details: string;
  id: string;
  name: string;
  date: string;
  reportDate: string;
  solveDate: string;
  receiver: string;
}

type EndpointCall = {
  id: string;
  date: Date;
  duration: number;
  endpointId: string;
  statusCode: number;
  responseBody: string;
  responseHeader: string;
};
export type { AppInfo, Endpoint, EndpointCall, BugInfo };
