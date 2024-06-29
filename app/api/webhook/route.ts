import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/strip";
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
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");
  const phone = session.customer_details?.phone || "NA";
  const name = session.customer_details?.name || "NA";
  const email = session.customer_details?.email || "NA";
  const transactionId = session.payment_intent?.toString() || "NA";

  if (event.type === "checkout.session.completed") {
    await prismadb.order.update({
      where: {
        id: session.metadata?.orderId,
      },
      data: {
        isPaid: true,
        status: "Processing",
        address: addressString,
        phone,
        name,
        email,
        transactionId,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
