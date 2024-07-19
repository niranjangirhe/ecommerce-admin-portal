import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;
    const { name, homepageBillboardId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
        homepageBillboardId:
          homepageBillboardId === "null" ? null : homepageBillboardId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await prismadb.$transaction(async (prisma) => {
      await prisma.store.update({
        where: { id: storeId },
        data: { homepageBillboardId: null },
      });

      await prisma.product.deleteMany({
        where: {
          storeId,
        },
      });

      return prisma.store.delete({
        where: {
          id: storeId,
          userId,
        },
      });
    });

    return NextResponse.json(store);
  } catch (error: any) {
    console.error("[STORE_DELETE]", error);
    if(error.code === "P2014") {
      return new NextResponse("Make sure you deleted all products", { status: 404 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
