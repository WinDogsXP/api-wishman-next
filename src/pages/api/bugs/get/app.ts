// pages/api/filterEndpointCalls.js

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = JSON.parse(req.body);

  try {
    const bugs = await prisma.bugReport.findMany({
      where: { App: { userId } },
      include: {
        App: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!bugs) {
      return res.status(404).json(bugs);
    }

    return res.status(200).json(bugs);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
