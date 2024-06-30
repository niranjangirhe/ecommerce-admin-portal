"use client";

import { useParams } from "next/navigation";

import { OrderColumn, columns } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const params = useParams();
  const origin = useOrigin();

  const BASEURL = `${origin}/api/${params.storeId}`;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders for you store"
        />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey={["id", "status", "createdAt"]}
      />
      <Heading title="API" description="API calls for Orders" />
      <Separator />
      <ApiAlert title="GET" variant="admin" description={`${BASEURL}/orders`} />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${BASEURL}/orders/{orderId}?phone={phone}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${BASEURL}/orders/{orderId}`}
      />
    </>
  );
};
