import prisma from "@/prismadb";
import { AppInfo } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

const getAppInfo = async (id: string) => {
  try {
    const app = await prisma.app.findFirst({
      where: { id },
    });

    if (!app) {
      throw new Error("App not found");
    }

    return app as AppInfo;
  } catch (error: any) {
    throw new Error(
      "Error fetching app with latest endpoint call date: " + error.message
    );
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const app = await getAppInfo(id);
    res.status(200).json({ app });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
