interface AppInfo {
  id: string;
  userId: string;
  name: string;
  isBugged?: boolean;
  description?: string;
  hours?: number;
  reportEmail?: string;
  status?: "Stable" | "Unstable" | "Down";
}
interface Endpoint {
  id: string;
  appId: string;
  url: string;
  headers: string;
  method: string;
  body: string;
  interval: number;

  status: string;
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
