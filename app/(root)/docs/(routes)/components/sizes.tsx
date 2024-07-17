import { ApiAlert } from "@/components/ui/api-alert";

const SizeAPIDoc = () => {
  return (
    <>
      <p className="pb-2">
        To get a list of sizes, make a GET request to the following URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/sizes"
        variant="public"
      />
      <p className="py-2">
        To get a specific size by its ID, make a GET request to the following
        URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/sizes/{sizeId}"
        variant="public"
      />
    </>
  );
};

export default SizeAPIDoc;
