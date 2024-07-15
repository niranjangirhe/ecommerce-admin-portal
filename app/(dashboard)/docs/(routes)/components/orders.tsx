import { ApiAlert } from "@/components/ui/api-alert";

const OrderAPIDoc = () => {
  return (
    <>
      <p className="py-2">
        To get a order by its ID, you can use the following endpoint. You need
        to provide the store ID, order ID and the last 4 digits of the phone
        number used to place the order.
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/orders/{orderId}?phone={last4Digits}"
        variant="public"
      />
    </>
  );
};

export default OrderAPIDoc;
