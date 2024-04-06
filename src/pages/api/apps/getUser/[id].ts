import prisma from "@/prismadb";
import { AppInfo, Endpoint } from "@/types";
import { query } from "firebase/database";
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

const appsWithLatestEndpointCall = async (id: string) => {
  try {
    const apps = await prisma.app.findMany({
      where: { userId: id },
      include: {
        endpoint: {
          include: {
            endpointCall: {
              orderBy: {
                date: "desc",
              },
              take: 1,
            },
          },
        },
      },
    });

    const appsWithStatus = apps.map((app) => {
      const latestEndpointCallDate =
        app.endpoint.length > 0 && app.endpoint[0].endpointCall.length > 0
          ? app.endpoint[0].endpointCall[0].date
          : undefined;

      const { endpoint, ...appInfo } = {
        ...app,
        status: getStatus(app.endpoint),
        latestEndpointCallDate,
      };

      return appInfo;
    });

    return appsWithStatus as AppInfo[];
  } catch (error: any) {
    throw new Error(
      "Error fetching apps with latest endpoint call dates: " + error.message
    );
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const apps = await appsWithLatestEndpointCall(id);
    res.status(200).json({ apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
