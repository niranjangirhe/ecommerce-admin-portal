import prismadb from "@/lib/prismadb";

export async function getTotalProducts(storeId: string) {
  const totalActive = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  const totalArchived = await prismadb.product.count({
    where: {
      storeId,
      isArchived: true,
    },
  });

  return {
    totalActive,
    totalArchived,
  };
}
