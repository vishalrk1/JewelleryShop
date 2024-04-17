import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextApiResponse) {
  var regex = /\/wishlist\/(\d+)/;
  const match = req.nextUrl.pathname.match(regex);
  if (!match) {
    return new NextResponse(
      "Failed to delete saveed item, item Id is required",
      {
        status: 404,
      }
    );
  }

  const wishlist_id = match[1];
  const id = req.nextUrl.searchParams.get("id");
  const product_id = req.nextUrl.searchParams.get("product_id");

  try {
    await prismadb.products_wishlist_products.delete({
      where: {
        id: BigInt(Number(id)),
        wishlist_id: parseInt(wishlist_id),
        product_id: BigInt(Number(product_id)),
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

    const wishlistItems = await prismadb.products_wishlist_products.findMany({
      where: {
        wishlist_id: parseInt(wishlist_id),
      },
      include: {
        products_product: true,
      },
    });

    return NextResponse.json(
      {
        message: "Item removed from woshlist",
        products_wishlist_products: wishlistItems,
      },
      { status: 200 }
    );
  } catch (error) {
    apiErrorResponse();
  }
}
