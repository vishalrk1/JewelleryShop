import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const feedbacks = await prismadb.userFeedbacks.findMany({
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
