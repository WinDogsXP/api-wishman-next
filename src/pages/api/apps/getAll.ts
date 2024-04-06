import prisma from "@/prismadb";
import { AppInfo, Endpoint } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

const getStatus = (endpoints: Endpoint[], isBugged: boolean) => {
  const statuses = endpoints.map((endpoint) => endpoint.status);
  let allDown = true;
  let allStable = true;
  statuses.forEach((stat) => {
    if (stat == "Stable") {
      allDown = false;
    }
    if (stat == "Down") allStable = false;
  });
  if (allStable || statuses.length === 0)
    return !isBugged ? "Stable" : "Unstable";
  if (allDown) return "Down";
  return "Unstable";
};

const appsWithLatestEndpointCall = async (userId?: string) => {
  try {
    const apps = userId
      ? await prisma.app.findMany({
          where: { userId },
          include: {
            endpoint: {
              include: {
                endpointCall: {
                  orderBy: {
                    date: "desc",
                  },
                  take: 1,
                  select: {
                    date: true,
                  },
                },
              },
            },
          },
        })
      : await prisma.app.findMany({
          include: {
            endpoint: {
              include: {
                endpointCall: {
                  orderBy: {
                    date: "desc",
                  },
                  take: 1,
                  select: {
                    date: true,
                  },
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
        status: getStatus(app.endpoint, app.isBugged),
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
    let _userId = undefined;

    try {
      const { userId } = JSON.parse(req.body);
      _userId = userId;
    } catch (error) {}

    const apps = await appsWithLatestEndpointCall(_userId);
    res.status(200).json({ apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
