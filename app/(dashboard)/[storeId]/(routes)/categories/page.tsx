import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import Loading from "@/components/ui/loading";

const CategoriesPage = async ({
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
          <CategoryList storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  );
};

const CategoryList = async ({ storeId }: { storeId: string }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard?.label || "None",
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return <CategoryClient data={formattedCategories} />;
};

export default CategoriesPage;
