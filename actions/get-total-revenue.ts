import prismadb from "@/lib/prismadb";

export async function getTotalRevenue(storeId: string) {
  const total = await prismadb.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      storeId,
      isPaid: true,
    },
  });
  return total._sum.totalAmount;
}
