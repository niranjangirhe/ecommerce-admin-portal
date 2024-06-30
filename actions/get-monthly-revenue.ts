import prismadb from "@/lib/prismadb";

export async function getMonthlySales(storeId: string) {
  const lastYearOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      },
    },
  });

  const monthlySales: any[] = [];

  for (let i = 11; i >= 0; i--) {
    const month = new Date(new Date().setMonth(new Date().getMonth() - i));
    const monthOrders = lastYearOrders.filter(
      (order) =>
        new Date(order.createdAt).getMonth() === month.getMonth() &&
        new Date(order.createdAt).getFullYear() === month.getFullYear()
    );
    const totalAmount = monthOrders.reduce(
      (acc, order) => acc + Number(order.totalAmount),
      0
    );
    monthlySales.push({
      name: month.toLocaleString("default", { month: "short" }),
      sales: totalAmount,
    });
  }

  return monthlySales;
}
