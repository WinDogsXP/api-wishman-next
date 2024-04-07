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

type EndpointCall = {
  id: string;
  date: Date;
  duration: number;
  endpointId: string;
  statusCode: number;
  responseBody: string;
  responseHeader: string;
};
export type { AppInfo, Endpoint, EndpointCall };
