import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";
import Loading from "@/components/ui/loading";

const ColorsPage = async ({
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
          <ColorList storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  );
};

const ColorList = async ({ storeId }: { storeId: string }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy"),
  }));

  return <ColorClient data={formattedColors} />;
};

export default ColorsPage;
