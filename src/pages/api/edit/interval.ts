import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { endpointId, userId, interval } = req.body;

    const userApps = await prisma.app.findFirst({
      where: {
        userId: userId,
        Endpoint: {
          some: {
            id: endpointId,
          },
        },
      },
    });

    if (!userApps) {
      return res
        .status(403)
        .json({ error: "User does not own the endpoint data" });
    }

    const updatedEndpoint = await prisma.endpoint.update({
      where: {
        id: endpointId,
      },
      data: {
        interval: interval,
      },
    });

    res.status(200).json({ updatedEndpoint });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
