import prismadb from "@/lib/prismadb";

export async function getStateWiseSales(storeId: string) {
  const stateWiseSales = await prismadb.order.groupBy({
    by: ["state"],
    _sum: {
      totalAmount: true,
    },
    where: {
      storeId,
      isPaid: true,
    },
  });

  return stateWiseSales.map((state) => ({
    statename: state.state || "Unknown",
    sales: Number(state._sum.totalAmount),
  }));
}
