import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

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
    products: order.orderItems
      .map((orderItem) =>
        (orderItem.product.name + " x " + orderItem.quantity).toString()
      )
      .join(", "),
    totalAmount: formatter.format(Number(order.totalAmount)),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
    isAdminCommentRead: order.isAdminCommentRead,
    status: order.status,
    trackingId: order.trackingId,
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
