import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
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
    await prisma.app.update({
      where: {
        id,
      },
      data: { isBugged: true },
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "think.er2869@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });
    const link = "http://localhost:3000/apps/" + id;
    var mailOptions = {
      from: "think.er2869@gmail.com",
      to: reportEmail,
      subject: "Bug Report",
      text:
        "The following app has a bug report : " +
        link +
        "\n" +
        name +
        "\n" +
        details,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
