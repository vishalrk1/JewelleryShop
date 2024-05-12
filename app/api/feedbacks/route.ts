import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const feedbacks = await prismadb.userFeedbacks.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        user: {
          include: {
            main_userprofile: true,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "feedbacks fetched successfully", feedbacks },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorResponse();
  }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const userId = req.nextUrl.searchParams.get("userId");
  const message = req.nextUrl.searchParams.get("message");

  if (!userId || !message) {
    return new NextResponse("Missing userId or message", { status: 400 });
  }

  try {
    const userFeedback = await prismadb.userFeedbacks
      .create({
        data: {
          message: message,
          userId: parseInt(userId),
          id: uuidv4(),
          createdAt: new Date(),
          updateddAt: new Date(),
        },
      })
      .catch((e: Prisma.PrismaClientKnownRequestError) => {
        if (e.code === "P2002") {
          throw new Error("Feedback already exists");
        }
      });

    return NextResponse.json(
      { message: "feedback created successfully", userFeedback },
      { status: 200 }
    );
  } catch (error: any) {
    return apiErrorResponse();
  }
}
