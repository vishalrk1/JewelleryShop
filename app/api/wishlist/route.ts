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

export async function POST(req: NextRequest, res: NextApiResponse) {
  const product_id = req.nextUrl.searchParams.get("product_id");
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

    const wishlist = await prismadb.products_wishlist.findUnique({
      where: {
        user_id: parseInt(user_id),
      },
      include: {
        products_wishlist_products: true,
      },
    });

    if (wishlist) {
      await prismadb.products_wishlist_products.create({
        data: {
          product_id: BigInt(Number(product_id)),
          wishlist_id: wishlist.products_wishlist_products[0].wishlist_id,
        },
      });
    } else {
      const newwWishlist = await prismadb.products_wishlist.create({
        data: {
          user_id: parseInt(user_id),
        },
        include: {
          products_wishlist_products: true,
        },
      });
      await prismadb.products_wishlist_products.create({
        data: {
          product_id: BigInt(Number(product_id)),
          wishlist_id: newwWishlist.products_wishlist_products[0].wishlist_id,
        },
      });
    }
    return NextResponse.json(
      {
        message: "Item added to sucessfully",
      },
      { status: 200 }
    );
  } catch (error) {
    apiErrorResponse();
  }
}
