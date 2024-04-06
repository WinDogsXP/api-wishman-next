import prisma from "@/prismadb";
import { AppInfo, Endpoint } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

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
      endpoint: true,
    },
  })) as AppInfo[];
  console.log(apps);
  const appsWithStatus = apps.map((app) => {
    return { ...app, status: getStatus(app.endpoint) };
  });

  try {
    res.status(200).send({ apps: appsWithStatus });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export default handler;
