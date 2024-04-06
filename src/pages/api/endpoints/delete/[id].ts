import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const { userId } = JSON.parse(req.body);

    const userApps = await prisma.endpoint.findFirst({
      where: {
        id,
        app: { userId },
      },
    });

    if (!userApps) {
      return res.status(403).json({ error: "User does not own the endpoint" });
    }
    const deletedEndpoint = await prisma.endpoint.delete({
      where: {
        id,
      },
    });

    const response = await axios.post(
      "http://localhost:8080/delete",
      deletedEndpoint
    );

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
