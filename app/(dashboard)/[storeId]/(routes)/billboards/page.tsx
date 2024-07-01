import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import Loading from "@/components/ui/loading";

const BillboardsPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<Loading />}>
          <BillboardList storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  );
};

const BillboardList = async ({ storeId }: { storeId: string }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    })
  );

  return <BillboardClient data={formattedBillboards} />;
};

export default BillboardsPage;
