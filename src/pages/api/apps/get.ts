import prisma from "@/prismadb";
import { stat } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
interface App {
  id: string;
  userId: string;
  name: string;
  Endpoint: Endpoint[];
  status?: string; // Make status property optional
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
const getStatus = (endpoints: Endpoint[]) => {
  const statuses = endpoints.map((endpoint) => endpoint.status);
  let allDown = true;
  let allStable = true;
  statuses.forEach((stat) => {
    if (stat == "Stable") allDown = false;
    if (stat == "Down") allStable = false;
  });
  if (allStable || statuses.length === 0) return "Stable";
  if (allDown) return "Down";
  return "Unstable";
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apps = (await prisma.app.findMany({
    include: {
      Endpoint: true,
    },
  })) as App[];
  console.log(apps);
  const appsWithStatus = apps.map((app) => {
    app = { ...app, status: getStatus(app.Endpoint) };
  });

  try {
    res.status(200).send({ appsWithStatus });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export default handler;
