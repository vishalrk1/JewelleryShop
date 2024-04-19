import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export function getRouteId(url: string) {
  var regex = /\/wishlist\/(\d+)/;
  const match = url.match(regex);
  return match;
}

export async function DELETE(req: NextRequest, res: NextApiResponse) {
  const match = getRouteId(req.nextUrl.pathname);
  if (!match) {
    return new NextResponse(
      "Failed to delete saveed item, item Id is required",
      {
        status: 404,
      }
    );
  }

  const wishlist_id = match[1];
  const item_id = req.nextUrl.searchParams.get("id");
  const product_id = req.nextUrl.searchParams.get("product_id");

  try {
    await prismadb.wishlistItem.delete({
      where: {
        id: Number(item_id),
        wishlistId: parseInt(wishlist_id),
        productId: Number(product_id),
      },
    });

    await prismadb.products_wishlist.findMany({
      where: {
        products_wishlist_products: {},
      },
      include: {
        products_wishlist_products: {
          include: {
            products_product: true,
          },
        },
      },
    });

    const wishlistItems = await prismadb.wishlistItem.findMany({
      where: {
        wishlistId: parseInt(wishlist_id),
      },
      include: {
        product: true,
        wishlist: true,
      },
    });

    return NextResponse.json(
      {
        message: "Item removed from woshlist",
        wishlistItems: wishlistItems,
      },
      { status: 200 }
    );
  } catch (error) {
    apiErrorResponse();
  }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const match = getRouteId(req.nextUrl.pathname);
  if (!match) {
    return new NextResponse(
      "Failed to delete saveed item, item Id is required",
      {
        status: 404,
      }
    );
  }

  const wishlist_id = match[1];
  const product_id = req.nextUrl.searchParams.get("product_id");

  console.log("wishlist Id", wishlist_id);

  try {
    const item = await prismadb.wishlistItem.findFirst({
      where: {
        wishlistId: Number(wishlist_id),
        productId: Number(product_id),
      },
    });

    if (item) {
      return NextResponse.json(
        { message: "Item already exists in wishlist" },
        {
          status: 409, 
        }
      );
    } else {
      // creating new wishlist item
      await prismadb.wishlistItem.create({
        data: {
          productId: Number(product_id),
          wishlistId: parseInt(wishlist_id),
        },
      });
    }

    const wishlist = await prismadb.wishlist.findUnique({
      where: {
        id: parseInt(wishlist_id),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        message: "Item added to woshlist",
        wishlist: wishlist,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorResponse();
  }
}
