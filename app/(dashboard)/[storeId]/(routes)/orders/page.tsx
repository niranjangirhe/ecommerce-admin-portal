import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import Loading from "@/components/ui/loading";

const OrderPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<Loading />}>
          <OrderList storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  );
};

const OrderList = async ({ storeId }: { storeId: string }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
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
      name: orderItem.product?.name || "",
      quantity: orderItem.quantity,
      price: Number(orderItem.product?.price || 0),
    })),
    name: order.name,
    phone: order.phone,
    address:
      order.address +
      ", " +
      order.city +
      ", " +
      order.state +
      ", " +
      order.postalCode,
    transactionId: order.transactionId,
    totalAmount: formatter.format(Number(order.totalAmount)),
    isPaid: order.isPaid,
    status: order.status,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return <OrderClient data={formattedOrders} />;
};

export default OrderPage;
