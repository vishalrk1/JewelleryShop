import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const user_id = req.nextUrl.searchParams.get("id"); // id here is user id
  try {
    if (!user_id) {
      return new NextResponse(
        "Failed to get wishlist details, User Id is required",
        {
          status: 404,
        }
      );
    }
    const userWishlist = await prismadb.products_wishlist.findUnique({
      where: {
        user_id: parseInt(user_id),
      },
      include: {
        products_wishlist_products: {
          include: {
            products_product: true,
          },
        },
      },
    });

    return NextResponse.json(userWishlist, { status: 200 });
  } catch (err) {
    apiErrorResponse();
  }
}
