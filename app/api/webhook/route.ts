import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/lib/stipe";
import { NextResponse } from "next/server";

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

  if (event.type === "checkout.session.completed") {
    if (!userId || !orderId) {
      return new NextResponse("Webhook error metadata missing", {
        status: 400,
      });
    }
    // create order and order item, and empty users cart
  } else {
    return new NextResponse("Webhook error unhandled error type", {
      status: 200,
    });
  }
  return new NextResponse(null, { status: 200 });
}
