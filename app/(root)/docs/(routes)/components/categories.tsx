import { ApiAlert } from "@/components/ui/api-alert";

const CategoryAPIDoc = () => {
  return (
    <>
      <p className="pb-2">
        To get a list of categories, make a GET request to the following URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/categories"
        variant="public"
      />
      <p className="py-2">
        To get a specific category by its ID, make a GET request to the
        following URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/categories/{categoryId}"
        variant="public"
      />
    </>
  );
};

export default CategoryAPIDoc;
