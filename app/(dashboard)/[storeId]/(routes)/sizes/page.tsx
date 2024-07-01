import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import Loading from "@/components/ui/loading";

const SizesPage = async ({
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
          <SizeList storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  );
};

const SizeList = async ({ storeId }: { storeId: string }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
  }));

  return <SizeClient data={formattedSizes} />;
};

export default SizesPage;
