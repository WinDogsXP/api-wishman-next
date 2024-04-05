import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id= req.query.id as string;
    const endpoints = prisma.endpoint.findMany({
      where: { appId : id },
    });
    res.status(200).send({endpoints});
  } catch (error) {
    res.status(500).send({error});
  }
};

export default handler;
