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

const appWithLatestEndpointCall = async (id: string) => {
  try {
    const app = await prisma.app.findFirst({
      where: { id },
      include: {
        endpoint: {
          include: {
            // Include only the date field from endpointCall
            endpointCall: {
              select: {
                date: true,
              },
              orderBy: {
                date: "desc",
              },
              take: 1,
            },
          },
        },
      },
    });

    if (!app) {
      throw new Error("App not found");
    }

    const latestEndpointCallDate =
      app.endpoint.length > 0 && app.endpoint[0].endpointCall.length > 0
        ? app.endpoint[0].endpointCall[0].date
        : undefined;

    const endpointsWithoutCalls = app.endpoint.map((endpoint) => {
      const { appId, body, headers, interval, endpointCall, ...restEndpoint } =
        endpoint;
      return restEndpoint;
    });

    const appInfo = {
      ...app,
      endpoint: endpointsWithoutCalls, // Update the endpoint property
      status: getStatus(app.endpoint),
      latestEndpointCallDate,
    };

    return appInfo;
  } catch (error: any) {
    throw new Error(
      "Error fetching app with latest endpoint call date: " + error.message
    );
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const app = await appWithLatestEndpointCall(id);
    res.status(200).json({ app });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
