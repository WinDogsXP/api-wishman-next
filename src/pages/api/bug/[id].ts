import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const { details, name } = req.body;

    const { reportEmail } = (await prisma.app.findFirst({
      where: {
        id,
      },
      select: {
        reportEmail: true,
      },
    })) as { reportEmail: string };

    await prisma.bugReport.create({
      data: {
        appId: id,
        name,
        details,
        receiver: reportEmail,
      },
    });
    //send mail
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
