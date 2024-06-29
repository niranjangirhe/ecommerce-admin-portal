import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

interface OrderItemWithProductName {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const OrderPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    orderItems: order.orderItems.map((orderItem) => ({
      id: orderItem.id,
      name: orderItem.product.name,
      quantity: orderItem.quantity,
      price: Number(orderItem.product.price),
    })),
    transactionId: order.transactionId,
    totalAmount: formatter.format(Number(order.totalAmount)),
    isPaid: order.isPaid,
    status: order.status,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrderPage;
