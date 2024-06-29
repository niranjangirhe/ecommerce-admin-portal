import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const orders = await prismadb.order.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[ORDER_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
