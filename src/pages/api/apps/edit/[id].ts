import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const { userId, name, description, hours } = req.body;

    const userApps = await prisma.app.findFirst({
      where: {
        userId: userId,
        id,
      },
    });

    if (!userApps) {
      return res
        .status(403)
        .json({ error: "User does not own the endpoint data" });
    }

    const updatedApp = await prisma.app.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        hours,
      },
    });

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
