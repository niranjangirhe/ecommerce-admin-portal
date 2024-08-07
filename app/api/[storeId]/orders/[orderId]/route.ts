import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string; storeId: string } }
) {
  try {
    const { orderId, storeId } = params;
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone") || undefined;

    if (!orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!phone || phone.length != 4) {
      return new NextResponse("Last 4 digits of phone number is required", {
        status: 400,
      });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: orderId,
        storeId,
        //match last 4 digits of phone number
        phone: {
          endsWith: phone.slice(-4),
        },
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
                category: true,
                color: true,
                size: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    const formattedOrder = {
      ...order,
      phone: `***-${order.phone.slice(-4)}`,
      // email: show only first 3 characters of email and last 1 character and then domain,
      email: `${order.email.slice(0, 2)}***${order.email.slice(
        order.email.indexOf("@") - 2,
        order.email.indexOf("@")
      )}@${order.email.split("@")[1]}`,
      orderItems: order.orderItems.map((item) => {
        return {
          ...item,
          product: {
            ...item.product,
            description: item.product?.description.toString("utf-8"),
          },
        };
      }),
    };

    return NextResponse.json(formattedOrder);
  } catch (error) {
    console.error("[ORDER_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, orderId } = params;
    const {
      name,
      phone,
      email,
      address,
      city,
      state,
      postalCode,
      country,
      status,
      transactionId,
      isPaid,
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const order = await prismadb.order.updateMany({
      where: {
        id: orderId,
        storeId,
      },
      data: {
        name,
        phone,
        email,
        address,
        city,
        state,
        postalCode,
        country,
        status,
        transactionId,
        isPaid,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDER_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
