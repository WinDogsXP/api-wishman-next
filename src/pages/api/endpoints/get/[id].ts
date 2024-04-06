// pages/api/filterEndpointCalls.js

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const endpointId = req.query.id as string;

  try {
    const endpoint = await prisma.endpoint.findUnique({
      where: { id: endpointId },
      include: { app: { select: { hours: true } } },
    });

    if (!endpoint) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    const currentTime = new Date();
    const cutoffTime = new Date(
      currentTime.getTime() - endpoint.app.hours * 60 * 60 * 1000
    );
    console.log(currentTime, cutoffTime);
    const filteredEndpointCalls = await prisma.endpointCall.findMany({
      where: {
        AND: [{ endpointId: endpointId }, { date: { gte: cutoffTime } }],
      },
    });

    return res
      .status(200)
      .json({ ...endpoint, endpointCalls: filteredEndpointCalls });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
