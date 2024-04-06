import prisma from "@/prismadb";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const { userId, interval, url, headers, method, body } = req.body;

    const userEndpoints = await prisma.app.findFirst({
      where: {
        userId: userId,
        endpoint: {
          some: {
            id,
          },
        },
      },
    });

    if (!userEndpoints) {
      return res
        .status(403)
        .json({ error: "User does not own the endpoint data" });
    }

    const updatedEndpoint = await prisma.endpoint.update({
      where: {
        id,
      },
      data: {
        interval: interval,
        url,
        headers,
        method,
        body,
      },
    });

    const response = await axios.post(
      "http://localhost:8080/update",
      updatedEndpoint
    );

    res.status(200).json({ updatedEndpoint });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
