import { ApiAlert } from "@/components/ui/api-alert";
import { CodeBox } from "@/components/ui/code-box";

const BaseUrlDoc = () => {
  return (
    <>
      <p className="pb-2">
        All API requests should be made to the following base URL:
      </p>
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description="https://admin-portal-domain.com/api/{storeId}"
        variant="public"
      />
      <p className="pt-2 text-muted-foreground italic whitespace-pre-wrap">
        Replace &apos;admin-portal-domain&apos; with the actual domain where
        your API is hosted. The {`{storeId}`} parameter is the ID of the store
        you want to get the billboards for.
      </p>
      <p className="pt-4 text-muted-foreground whitespace-pre-wrap">
        This NEXT_PUBLIC_API_URL serves as the foundation for all endpoint paths
        in our API. If you are using the StoreOps sample frontend UI, you need
        to use environment variables to manage the base URL.
      </p>
      <p className="pt-2">Add the followint in the frontend .env file</p>
      <CodeBox
        description={`NEXT_PUBLIC_API_URL=https://admin-portal-domain/api/{storeId}`}
      />
    </>
  );
};

export default BaseUrlDoc;
