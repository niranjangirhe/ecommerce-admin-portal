import { ApiAlert } from "@/components/ui/api-alert";

const HomepageAPIDoc = () => {
  return (
    <>
      <p className="pb-2">
        To get homepage billboards, make a GET request to the following URL:
      </p>
      <ApiAlert
        title="GET"
        description="https://admin-portal-domain/api/{storeId}/billboards/homepage"
        variant="public"
      />
    </>
  );
};

export default HomepageAPIDoc;
