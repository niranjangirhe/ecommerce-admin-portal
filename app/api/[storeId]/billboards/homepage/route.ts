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

    const storeWithHomepageBillboard = await prismadb.store.findFirst({
      where: {
        id: storeId,
      },
      include: {
        homepageBillboard: true,
      },
    });

    return NextResponse.json(storeWithHomepageBillboard?.homepageBillboard);
  } catch (error) {
    console.error("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
