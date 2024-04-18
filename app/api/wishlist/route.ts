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
    // const userWishlist = await prismadb.products_wishlist.findUnique({
    //   where: {
    //     user_id: parseInt(user_id),
    //   },
    //   include: {
    //     products_wishlist_products: {
    //       include: {
    //         products_product: true,
    //       },
    //     },
    //   },
    // });

    const wishlist = await prismadb.wishlist.findUnique({
      where: {
        userId: parseInt(user_id),
      },
    });

    if (!wishlist) {
      return new NextResponse(
        "Failed to get wishlist details, User Id is required",
        {
          status: 404,
        }
      );
    }

    const userWishlist = await prismadb.wishlistItem.findMany({
      where: {
        wishlistId: wishlist.id,
      },
      include: {
        product: true,
        wishlist: true,
      },
    });
    // const wl = await prismadb.wishlist.create({
    //   data: {
    //     userId: parseInt(user_id),
    //   },
    // });

    // console.log(wl);

    return NextResponse.json(
      {
        message: "Wishlist details fetched sucessfully",
        wishlist: wishlist,
        wishlistItems: userWishlist,
      },
      { status: 200 }
    );
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
    if (!product_id) {
      return new NextResponse(
        "Failed to get wishlist details, User Id is required",
        {
          status: 404,
        }
      );
    }

    const wishlist = await prismadb.wishlist.findUnique({
      where: {
        userId: parseInt(user_id),
      },
      include: {
        items: true,
      },
    });

    if (!wishlist) {
      return new NextResponse(
        "Failed to get wishlist details, User Id is required",
        {
          status: 404,
        }
      );
    }

    const wlItem = await prismadb.wishlistItem.create({
      data: {
        productId: parseInt(product_id),
        wishlistId: wishlist.id,
      },
    });

    const items = await prismadb.wishlistItem.findMany({
      where: {
        wishlistId: wishlist.id,
      },
      include: {
        product: true,
        wishlist: true,
      },
    });

    return NextResponse.json(
      {
        message: "Item added to sucessfully",
        wishlist: items,
      },
      { status: 200 }
    );
  } catch (error) {
    apiErrorResponse();
  }
}
