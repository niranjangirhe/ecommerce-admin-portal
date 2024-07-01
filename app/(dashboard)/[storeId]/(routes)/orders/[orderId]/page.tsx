import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import OrderForm from "./components/order-form";
import Loading from "@/components/ui/loading";

const OrderPageMaker = async ({ orderId }: { orderId: string }) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: orderId,
    },
  });

  const newOrder = {
    ...order!,
    totalAmount: Number(order?.totalAmount),
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center mt-20">
        Order not found
      </div>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm initialData={newOrder} />
      </div>
    </div>
  );
};

const OrderPage = ({
  params,
}: {
  params: {
    orderId: string;
  };
}) => (
  <Suspense fallback={<Loading />}>
    <OrderPageMaker orderId={params.orderId} />
  </Suspense>
);

export default OrderPage;
