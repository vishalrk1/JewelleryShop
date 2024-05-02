import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/lib/stipe";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log("[STRIPE WEBHOOK ERROR]: ", error.message);
    return new NextResponse(`Weebhook error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const orderId = session?.metadata?.orderId;
  const cartId = session?.metadata?.cartId;
  const addressId = session?.metadata?.addressId;

  switch (event.type) {
    case "checkout.session.completed":
      if (!userId || !orderId || !addressId || !cartId) {
        return new NextResponse("Webhook error metadata missing", {
          status: 400,
        });
      }
      // create order and order item, and empty users cart
      const address = await prismadb.main_useraddress.findUnique({
        where: {
          id: parseInt(addressId),
          main_userprofile: {
            auth_user: {
              id: parseInt(userId),
            },
          },
        },
        include: {
          main_userprofile: true,
        },
      });

      if (!address) {
        return new NextResponse("Webhook error address not found", {
          status: 400,
        });
      }

      const order = await prismadb.order_order.create({
        data: {
          order_id: orderId,
          total_amount: session?.amount_total ? session.amount_total / 100 : 0,
          delivery_status: "pending",
          payment_status: session.payment_status,
          is_paid: true,
          created_at: new Date(),
          updated_at: new Date(),
          payment_date: new Date(),
          transaction_id:
            session.payment_intent?.toString() === "paid"
              ? "sucess"
              : "pending",
          auth_user: {
            connect: {
              id: parseInt(userId),
            },
          },
          main_useraddress: {
            connect: {
              id: parseInt(addressId),
            },
          },
        },
      });

      const cart_products = await prismadb.cart_cartitem.findMany({
        where: {
          cart_id: Number(cartId),
        },
        include: {
          products_product: true,
        },
      });

      cart_products?.forEach(async (item) => {
        const order_item = await prismadb.order_orderitem.create({
          data: {
            quantity: item.quantity,
            products_product: {
              connect: {
                id: item.products_product.id,
              },
            },
            order_order: {
              connect: {
                id: order.id,
              },
            },
          },
        });
      });

      // empty cart
      await prismadb.cart_cartitem.deleteMany({
        where: {
          cart_id: parseInt(cartId),
        },
      });
      return new NextResponse("Webhook success", { status: 200 });
    case "checkout.session.async_payment_failed":
      return null;
    default:
      return new NextResponse("Webhook error unhandled error type", {
        status: 200,
      });
  }
}
