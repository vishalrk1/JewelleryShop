import prismadb from "@/lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

// Extend the global BigInt object with a toJSON method
declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// Extend BigInt prototype with a toJSON method
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return new NextResponse("Email is required", {
        status: 404,
      });
    }

    const userDetails = await prismadb.auth_user.findFirst({
      where: {
        email: email,
        username: "vishal_rk1",
      },
    });
    const userProfile = await prismadb.main_userprofile.findFirst({
      where: {
        auth_user: {
          id: userDetails?.id,
          username: userDetails?.username,
          password: userDetails?.password,
        },
      },
      include: {
        main_useraddress: true,
      },
    });

    if (!userDetails) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    return NextResponse.json({ ...userDetails, ...userProfile });
  } catch (error) {
    console.log(error);
    return new NextResponse("Interal server error, failed to get details", {
      status: 404,
    });
  }
}
