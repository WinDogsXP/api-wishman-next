import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const endpointCalls = prisma.endpointCall.findMany({
      where: { endpointId: id },
    });
    res.status(200).send({ endpointCalls });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export default handler;
