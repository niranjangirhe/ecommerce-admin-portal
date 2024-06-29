import prismadb from "@/lib/prismadb";
import OrderForm from "./components/order-form";

const OrderPage = async ({
  params,
}: {
  params: {
    orderId: string;
  };
}) => {
  const Order = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
    },
  });

  console.log("Order", Order);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm initialData={Order} />
      </div>
    </div>
  );
};

export default OrderPage;
