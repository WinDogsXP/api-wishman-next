import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const { userId, interval, url, headers, method, body, name } = req.body;

    const userApp = await prisma.app.findFirst({
      where: {
        userId,
        id,
      },
    });

    if (!userApp) {
      return res.status(403).json({ error: "User does not own the app " });
    }

    const updatedEndpoint = await prisma.endpoint.create({
      data: {
        appId: id,
        interval,
        url,
        headers,
        method,
        body,
        name,
      },
    });

    res.status(200).json({ updatedEndpoint });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
