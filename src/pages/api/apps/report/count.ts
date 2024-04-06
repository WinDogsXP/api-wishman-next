import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.body;

    const totalApps = prisma.app.count({
      where: {
        userId,
      },
    });
    const totalIssues = prisma.app.count({
      where: {
        isBugged: true,
        userId,
      },
    });
    const activeReports = prisma.bugReport.count({
      where: {
        App: {
          isBugged: true,
          userId,
        },
      },
    });
    const stats = [
      {
        name: "Total apps",
        value: totalApps,
      },
      {
        name: "Apps with issues",
        value: totalIssues,
      },
      {
        name: "Active reports",
        value: activeReports,
      },
    ];

    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
