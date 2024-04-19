import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

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
  const user_id = req.nextUrl.searchParams.get("id"); // id here is user id
  const email = req.nextUrl.searchParams.get("email");

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
          id: parseInt(user_id),
        },
      },
      include: {
        cart_cartitem: {
          include: {
            products_product: true,
          },
        },
      },
    });
    return NextResponse.json(catData, { status: 200 });
  } catch (error) {
    return apiErrorResponse();
  }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const cart_id = req.nextUrl.searchParams.get("id"); // id here is cart id
  const product_id = req.nextUrl.searchParams.get("product_id");

  try {
    if (!cart_id) {
      return new NextResponse(
        "Failed to add item to cart, User Id is required",
        {
          status: 404,
        }
      );
    }
    if (!product_id) {
      return new NextResponse(
        "Failed to add item to cart, Product Id is required",
        {
          status: 404,
        }
      );
    }

    const cartItem = await prismadb.cart_cartitem.findFirst({
      where: { cart_id: parseInt(cart_id), product_id: parseInt(product_id) },
    });

    if (cartItem) {
      await prismadb.cart_cartitem.update({
        where: { cart_item_id: cartItem.cart_item_id },
        data: { quantity: cartItem.quantity + 1 },
      });
    } else {
      await prismadb.cart_cartitem.create({
        data: {
          cart_item_id: uuidv4(),
          quantity: 1,
          id: uuidv4(),
          product_id: parseInt(product_id),
          cart_id: parseInt(cart_id),
        },
      });
    }

    const cart = await prismadb.cart_cart.findUnique({
      where: {
        id: parseInt(cart_id),
      },
      include: {
        cart_cartitem: {
          include: {
            products_product: true,
          },
        },
      },
    });

    return NextResponse.json(cart ? cart : [], { status: 200 });
  } catch (error) {
    return apiErrorResponse();
  }
}
