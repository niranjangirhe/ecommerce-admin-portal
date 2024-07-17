import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/strip";
import prismadb from "@/lib/prismadb";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const body = await buffer(req);
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    console.log("Received signature:", signature);
    console.log(
      "Webhook secret:",
      process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 5) + "..."
    );
    console.log("Body length:", body.length);
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
    const session = event.data.object as Stripe.Checkout.Session;
    const address = session.customer_details?.address;
    const addressString = address?.line1 + ", " + address?.line2;
    const phone = session.customer_details?.phone || "NA";
    const name = session.customer_details?.name || "NA";
    const email = session.customer_details?.email || "NA";
    const transactionId = session.payment_intent?.toString() || "NA";

    if (event.type === "checkout.session.completed") {
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
          phone,
          name,
          email,
          transactionId,
        },
      });

      if (!order) {
        console.error(`⚠️ Order ${session.metadata?.orderId} not found.`);
        return new NextResponse(`Order not found`, { status: 404 });
      }
    }
    console.log(`✅ Order ${session.metadata?.orderId} marked as paid.`);
    return new NextResponse(null, { status: 200 });
  } catch (e) {
    console.error(`⚠️ Error processing webhook:`, e);
    return new NextResponse(`Webhook Error: ${e}`, { status: 400 });
  }
}

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};
