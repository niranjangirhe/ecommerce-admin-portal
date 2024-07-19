import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/strip";
import prismadb from "@/lib/prismadb";


export const runtime = 'edge';

export async function POST(req: Request) {
   const rawBody = await readStream(req.body);
  const signature = headers().get("Stripe-Signature") as string;

  console.log("body:", JSON.stringify(req.body, null, 2));
  console.log("Raw body:", rawBody);
  console.log("Signature:", signature);

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    const address = session.customer_details?.address;
    const addressString = address?.line1 + ", " + address?.line2;
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
          city: address?.city || "NA",
          state: address?.state || "NA",
          postalCode: address?.postal_code || "NA",
          country: address?.country || "NA",
          phone,
          name,
          email,
          transactionId,
        },
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (e) {
    return new NextResponse(`Webhook Error: ${e}`, { status: 400 });
  }
}

async function readStream(stream: ReadableStream | null): Promise<string> {
  if (!stream) {
    return '';
  }

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }

  result += decoder.decode(); // Flush the decoder
  return result;
}