import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/lib/strip";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  if (!signature) {
    return new NextResponse("Missing Stripe-Signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`⚠️ Webhook signature verification failed.`, err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const address = session.customer_details?.address;
      const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
      ].filter(Boolean);
      const addressString = addressComponents.join(", ");

      const order = await prismadb.order.update({
        where: {
          id: session.metadata?.orderId,
        },
        data: {
          isPaid: true,
          status: "Processing",
          address: addressString,
          city: address?.city || "NA",
          state: address?.state || "NA",
          postalCode: address?.postal_code || "NA",
          country: address?.country || "NA",
          phone: session.customer_details?.phone || "NA",
          name: session.customer_details?.name || "NA",
          email: session.customer_details?.email || "NA",
          transactionId: session.payment_intent?.toString() || "NA",
        },
      });

      if (!order) {
        console.error(`⚠️ Order ${session.metadata?.orderId} not found.`);
        return new NextResponse(`Order not found`, { status: 404 });
      }
      console.log(`✅ Order ${session.metadata?.orderId} marked as paid.`);
      return new NextResponse(null, { status: 200 });
    }

    throw new Error(`Unhandled event type: ${event.type}`);
  } catch (e) {
    console.error(`⚠️ Error processing webhook:`, e);
    return new NextResponse(`Webhook Error: ${e}`, { status: 500 });
  }
}
