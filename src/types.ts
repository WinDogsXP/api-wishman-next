interface AppInfo {
  id: string;
  userId: string;
  name: string;
  endpoint: Endpoint[];
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
  isBugged: boolean;
  status: string;
}

export type { AppInfo, Endpoint };
