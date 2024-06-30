import prismadb from "@/lib/prismadb";

export async function getTotalOrdersByType(storeId: string) {
  const orders = await prismadb.order.groupBy({
    by: ["status"],
    where: {
      storeId,
    },
    _count: {
      status: true,
    },
  });

  const totalProcessing =
    orders.find((order) => order.status === "Processing")?._count?.status || 0;
  const totalDelivered =
    orders.find((order) => order.status === "Delivered")?._count?.status || 0;
  const totalCancelled =
    orders.find((order) => order.status === "Cancelled")?._count?.status || 0;
  const totalCreated =
    orders.find((order) => order.status === "Created")?._count?.status || 0;
  const totalShipped =
    orders.find((order) => order.status === "Shipped")?._count?.status || 0;
  return {
    totalProcessing,
    totalDelivered,
    totalCancelled,
    totalCreated,
    totalShipped,
  };
}
