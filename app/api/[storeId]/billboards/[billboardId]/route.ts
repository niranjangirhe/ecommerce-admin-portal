import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { billboardId, storeId } = params;

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;
    const { label, imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    let billboard= null;

    if(storeByUserId.homepageBillboardId === billboardId) {

    billboard = await prismadb.store
      .update({
        where: { id: storeId },
        data: { homepageBillboardId: null },
      })
      .then(() => {
        return prismadb.billboard.deleteMany({
          where: {
            id: billboardId,
            storeId,
          },
        });
      });
    } else {
      billboard = await prismadb.billboard.deleteMany({
        where: {
          id: billboardId,
          storeId,
        },
      });
    }

    if (!billboard) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
