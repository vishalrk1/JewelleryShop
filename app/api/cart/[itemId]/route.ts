import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextApiResponse) {
  var regex = /\/cart\/(\d+)/;
  const match = req.nextUrl.pathname.match(regex);
  if (!match) {
    return new NextResponse(
      "Failed to delete cart details, cart Id is required",
      {
        status: 404,
      }
    );
  }

  const cart_id = match[1];
  const cart_item_id = req.nextUrl.searchParams.get("cart_item_id");

  try {
    if (!cart_id) {
      return new NextResponse(
        "Failed to delete cart details, cart Id is required",
        {
          status: 404,
        }
      );
    }

    if (!cart_item_id) {
      return new NextResponse(
        "Failed to delete product, product id is required",
        {
          status: 404,
        }
      );
    }

    const product = await prismadb.cart_cartitem.delete({
      where: {
        cart_id: parseInt(cart_id),
        cart_item_id: cart_item_id,
      },
    });

    const cartItems = await prismadb.cart_cartitem.findMany({
      where: {
        cart_id: parseInt(cart_id),
      },
      include: {
        products_product: true,
      },
    });

    return NextResponse.json(
      {
        message: "Product removed from cart successfully",
        cartItems: cartItems,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorResponse();
  }
}

export async function PATCH(req: NextRequest, res: NextApiResponse) {
  var regex = /\/cart\/(\d+)/;
  const match = req.nextUrl.pathname.match(regex);
  if (!match) {
    return new NextResponse(
      "Failed to delete cart details, cart Id is required",
      {
        status: 404,
      }
    );
  }

  const cart_id = match[1];
  const cart_item_id = req.nextUrl.searchParams.get("cart_item_id");
  const quantity = req.nextUrl.searchParams.get("quantity");

  try {
    if (!cart_id) {
      return new NextResponse(
        "Failed to delete cart details, cart Id is required",
        {
          status: 404,
        }
      );
    }

    if (!cart_item_id) {
      return new NextResponse(
        "Failed to delete product, product id is required",
        {
          status: 404,
        }
      );
    }

    if (!quantity) {
      return new NextResponse(
        "Failed to update product, Quantity is required",
        {
          status: 404,
        }
      );
    }

    const updateditem = await prismadb.cart_cartitem.update({
      where: {
        cart_id: parseInt(cart_id),
        cart_item_id: cart_item_id,
      },
      include: {
        products_product: true,
      },
      data: {
        quantity: parseInt(quantity),
      },
    });

    const cartItems = await prismadb.cart_cartitem.findMany({
      where: {
        cart_id: parseInt(cart_id),
      },
      include: {
        products_product: true,
      },
    });

    return NextResponse.json(
      {
        message: "Product quantity updated successfully",
        cartItems: cartItems,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorResponse();
  }
}
