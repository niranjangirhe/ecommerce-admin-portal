import { ApiAlert } from "@/components/ui/api-alert";

const BillboardAPIDoc = () => {
  return (
    <>
      <p className="pb-2">
        To get a list of billboards, make a GET request to the following URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/billboards"
        variant="public"
      />
      <p className="py-2">
        To get a specific billboard by its ID, make a GET request to the
        following URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/billboards/{billboardId}"
        variant="public"
      />
    </>
  );
};

export default BillboardAPIDoc;
