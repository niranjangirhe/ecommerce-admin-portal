import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { productId, storeId } = params;

    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    interface Description {
      description: Buffer | string;
    }

    const product: (Omit<Product, "description"> & Description) | null =
      await prismadb.product.findUnique({
        where: {
          id: productId,
          storeId,
        },
        include: {
          category: true,
          color: true,
          size: true,
          images: true,
        },
      });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    product.description = product.description.toString("utf8");

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, productId } = params;
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

    const product = await prismadb.product.update({
      where: {
        id: productId,
        storeId,
      },
      data: {
        name,
        description: Buffer.from(description, "utf8"),
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, productId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
        storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
