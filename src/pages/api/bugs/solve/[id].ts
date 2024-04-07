import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const { userId } = JSON.parse(req.body);

    const bug_report = await prisma.bugReport.findFirst({ where: { id: id } });
    const app = await prisma.app.findFirst({
      where: { id: bug_report?.appId as string },
    });
    if (app?.userId != userId) {
      res.status(403).send({
        error: "User doesn't have permission to mark this bug as solved",
      });
    }

    await prisma.bugReport.update({
      where: { id: id },
      data: {
        solveDate: new Date(Date.now()),
      },
    });

    await prisma.app.update({
      where: {
        id: app?.id,
      },
      data: { isBugged: false },
    });

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
