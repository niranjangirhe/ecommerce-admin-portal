import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/strip";
import prismadb from "@/lib/prismadb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
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

      await prismadb.order.update({
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

      console.log(`✅ Order ${session.metadata?.orderId} marked as paid.`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (e) {
    console.error(`⚠️ Error processing webhook:`, e);
    return new NextResponse(`Webhook Error: ${e}`, { status: 500 });
  }
}
