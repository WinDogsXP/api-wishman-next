import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apps = await prisma.app.findMany();
  try {
    res.status(200).send({ apps });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export default handler;
