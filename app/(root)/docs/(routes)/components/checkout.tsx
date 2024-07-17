import { ApiAlert } from "@/components/ui/api-alert";
import { CodeBox } from "@/components/ui/code-box";

const CheckoutDoc = () => {
  return (
    <>
      <p className="pb-2">
        To initiate a checkout process, make a POST request to the following
        URL:
      </p>
      <ApiAlert
        title="POST"
        description="https://admin-portal-domain/api/{storeId}/checkout"
        variant="public"
      />
      <p className="py-2">
        The POST request body should contain the following JSON structure:
      </p>
      <CodeBox
        description={`
        {
          "orders": [
            {
              "id": "string",
              "quantity": number
            }
          ],
          "checkoutUrl": "string"
        }
        `}
      />
      <p className="py-2">Parameters:</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>orders</strong>: An array of order objects, each containing:
          <ul className="list-circle pl-6">
            <li>
              <strong>id</strong>: The unique identifier of the product (string)
            </li>
            <li>
              <strong>quantity</strong>: The quantity of the product (number)
            </li>
          </ul>
        </li>
        <li>
          <strong>checkoutUrl</strong>: The URL to redirect after checkout
          (string)
        </li>
      </ul>
      <p className="py-2">
        The API will respond with a JSON object containing the Stripe checkout
        session URL:
      </p>
      <CodeBox
        description={`
        {
          "url": "https://checkout.stripe.com/..."
        }
        `}
      />
      <p className="py-2">
        Note: This endpoint creates a new order in the database and initiates a
        Stripe checkout session. It handles product validation, calculates the
        total amount, and sets up necessary details for the Stripe session,
        including shipping and billing information collection.
      </p>
    </>
  );
};

export default CheckoutDoc;
