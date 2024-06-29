import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string; storeId: string } }
) {
  try {
    const { orderId, storeId } = params;

    if (!orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: orderId,
        storeId,
      },
    });

    return NextResponse.json(order);
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
    const { name, phone, email, address, status, transactionId, isPaid } =
      await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!address) {
      return new NextResponse("Address is required", { status: 400 });
    }

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    if (!transactionId) {
      return new NextResponse("Transaction ID is required", { status: 400 });
    }

    if (isPaid === undefined) {
      return new NextResponse("Is Paid is required", { status: 400 });
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
