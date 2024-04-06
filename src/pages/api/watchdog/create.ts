import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { appId, userId, url, method, headers, body, interval } = req.body;

    const userApps = await prisma.app.findFirst({
      where: {
        userId: userId,
        id: appId,
      },
    });

    if (!userApps) {
      return res.status(403).json({ error: "User does not own the app" });
    }
    //send request to node and get

    res.status(200).json({ updatedEndpoint });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
