import { ApiAlert } from "@/components/ui/api-alert";

const ColorAPIDoc = () => {
  return (
    <>
      <p className="pb-2">
        To get a list of colors, make a GET request to the following URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/colors"
        variant="public"
      />
      <p className="py-2">
        To get a specific color by its ID, make a GET request to the following
        URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/colors/{colorId}"
        variant="public"
      />
    </>
  );
};

export default ColorAPIDoc;
