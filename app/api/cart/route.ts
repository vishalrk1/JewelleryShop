import prismadb from "@/lib/prismadb";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const user_id = req.nextUrl.searchParams.get("id"); // id here is user id
  const email = req.nextUrl.searchParams.get("email");

  console.log("user_id", user_id);
  console.log("email", email);

  try {
    if (!user_id) {
      return new NextResponse(
        "Failed to get cart details, User Id is required",
        {
          status: 404,
        }
      );
    }
    if (!email) {
      return new NextResponse("Failed to get cart details, Email is required", {
        status: 404,
      });
    }

    const catData = await prismadb.cart_cart.findFirst({
      where: {
        auth_user: {
          email: email,
          id: parseInt(user_id)
        },
      },
      include: {
        cart_cartitem: true,
      },
    });
    console.log(catData);
    return NextResponse.json(catData ? catData : [], { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to get cart details", {
      status: 404,
    });
  }
}
