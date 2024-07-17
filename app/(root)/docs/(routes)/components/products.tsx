import { ApiAlert } from "@/components/ui/api-alert";

const ProductAPIDoc = () => {
  return (
    <>
      <p className="pb-2">
        To get a list of products, make a GET request to the following URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/products"
        variant="public"
      />
      <p className="py-2">
        You can also filter the products by name, categoryId, colorId, sizeId,
        isFeatured, and isArchived. To do this, make a GET request to the
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/products?name={name}&categoryId={categoryId}&colorId={colorId}&sizeId={sizeId}&isFeatured={isFeatured}&isArchived={isArchived}"
        variant="public"
      />
      <p className="py-2">
        To get a specific product by its ID, make a GET request to the following
        URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/products/{productId}"
        variant="public"
      />
    </>
  );
};

export default ProductAPIDoc;
