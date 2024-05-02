import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stipe";
import { apiErrorResponse } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import Stripe from "stripe";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const email = req.nextUrl.searchParams.get("email");
    const cartId = req.nextUrl.searchParams.get("cartId");
    const addressId = req.nextUrl.searchParams.get("addressId");

    console.log(userId, email, cartId);

    if (!userId || !email || !cartId || !addressId) {
      return new NextResponse("UNAUTHORISED USER", { status: 401 });
    }

    const cart_products = await prismadb.cart_cartitem.findMany({
      where: {
        cart_id: Number(cartId),
      },
      include: {
        products_product: true,
      },
    });

    if (cart_products.length === 0) {
      return new NextResponse("Cart is empty cant proceed the payment");
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart_products.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "INR",
          product_data: {
            name: item.products_product.prod_title as string,
            description: item.products_product?.prod_desc as string,
            images: [item.products_product.prod_image_url],
          },
          unit_amount: Math.round(
            Number(item.products_product.prod_price) * 100
          ),
        },
      }));

    let stripeCustomer = await prismadb.stripeCustomer.findUnique({
      where: {
        userId: userId,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: email,
      });
      stripeCustomer = await prismadb.stripeCustomer.create({
        data: {
          userId: userId,
          stripeCustomerId: customer.id,
        },
      });
    }

    // initiating stripe session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      metadata: {
        orderId: params.orderId,
        userId: userId,
        cartId: cartId,
        addressId: addressId,
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.log("[PLACE ORDER ERROR]: ", error);
    apiErrorResponse();
  }
}
