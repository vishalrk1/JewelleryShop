import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

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
    const password = req.nextUrl.searchParams.get("password");

    if (!email)
      return new NextResponse("email is required please provide a email", {
        status: 400,
      });

    if (!password)
      return new NextResponse(
        "Password is required please provide a password",
        { status: 400 }
      );

    const user = await prisma?.auth_user.findFirst({
      where: {
        // username: username,
        email: email,
        password: password,
      },
      include: {
        main_userprofile: {
          include: {
            main_useraddress: true,
          },
        },
      },
    });

    if (!user)
      return new NextResponse("Invalid username or password", { status: 404 });

    // user.password = "";

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(error.message, { status: 400 });
  }
}
