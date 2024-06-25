import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;
    const {
      name,
      description,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse("Description is required", {
        status: 400,
      });
    }

    if (!price) {
      return new NextResponse("Price is required", {
        status: 400,
      });
    }

    if (!categoryId) {
      return new NextResponse("CategoryId is required", {
        status: 400,
      });
    }

    if (!colorId) {
      return new NextResponse("ColorId is required", {
        status: 400,
      });
    }

    if (!sizeId) {
      return new NextResponse("SizeId is required", {
        status: 400,
      });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", {
        status: 400,
      });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    const categoryById = await prismadb.category.findFirst({
      where: {
        id: categoryId,
        storeId,
      },
    });

    if (!categoryById) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const colorById = await prismadb.color.findFirst({
      where: {
        id: colorId,
        storeId,
      },
    });

    if (!colorById) {
      return new NextResponse("Color not found", { status: 404 });
    }

    const sizeById = await prismadb.size.findFirst({
      where: {
        id: sizeId,
        storeId,
      },
    });

    if (!sizeById) {
      return new NextResponse("Size not found", { status: 404 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        description: Buffer.from(description, "utf8"),
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
    const isArchived = searchParams.get("isArchived");

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: storeId,
        categoryId,
        colorId,
        sizeId,
        name: name ? { contains: name } : undefined,
        isFeatured:
          isFeatured === "true"
            ? true
            : isFeatured === "false"
            ? false
            : undefined,
        isArchived:
          isArchived === "true"
            ? true
            : isArchived === "false"
            ? false
            : undefined,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
