import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/strip";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

type Order = {
  id: string;
  quantity: number;
};

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json();
  const orders: Order[] = body.orders;
  const checkoutUrl: string = body.checkoutUrl;

  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return new NextResponse("Orders field is required", {
      status: 400,
      headers: corsHeaders,
    });
  }

  const productIds = orders.map((order) => order.id);

  const products = await prismadb.product.findMany({
    where: { id: { in: productIds } },
    include: { images: true },
  });

  if (products.length !== orders.length) {
    return new NextResponse("Invalid product in order", {
      status: 400,
      headers: corsHeaders,
    });
  }

  const store = await prismadb.store.findUnique({
    where: { id: params.storeId },
  });

  if (!store) {
    return new NextResponse("Store not found", {
      status: 404,
      headers: corsHeaders,
    });
  }

  if (!checkoutUrl) {
    return new NextResponse("Store check out url not found", {
      status: 400,
      headers: corsHeaders,
    });
  }

  const orderWithProducts = orders.map((order) => {
    const product = products.find((product) => product.id === order.id);

    return {
      quantity: order.quantity,
      ...product,
    };
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  orderWithProducts.forEach((order) => {
    line_items.push({
      price_data: {
        currency: "INR",
        product_data: {
          name: order.name!,
          description: order.description!.toString("utf-8"),
          images: order.images!.map((image) => image.url),
        },
        unit_amount: order.price!.toNumber() * 100,
      },
      quantity: order.quantity,
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      totalAmount: orderWithProducts.reduce(
        (total, order) => total + order.price!.toNumber() * order.quantity,
        0
      ),
      orderItems: {
        create: orderWithProducts.map((order) => ({
          product: { connect: { id: order.id } },
          quantity: order.quantity,
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${checkoutUrl}?success=1&orderId=${order.id}`,
    cancel_url: `${checkoutUrl}?canceled=1&orderId=${order.id}`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
