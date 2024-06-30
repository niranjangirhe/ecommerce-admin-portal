import prismadb from "@/lib/prismadb";
import OrderForm from "./components/order-form";

const OrderPage = async ({
  params,
}: {
  params: {
    orderId: string;
  };
}) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
    },
  });

  // change totalAmount in order to Number
  const newOrder = {
    ...order!,
    totalAmount: Number(order?.totalAmount),
  };

  if (!order) {
    return (
      <div className="flex items-ceter justify-center mt-20">
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

export default OrderPage;
