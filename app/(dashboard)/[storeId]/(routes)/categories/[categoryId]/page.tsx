import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";
import Loading from "@/components/ui/loading";

const CategoryPageMaker = async ({
  categoryId,
  storeId,
}: {
  categoryId: string;
  storeId: string;
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

const CategoryPage = ({
  params,
}: {
  params: {
    categoryId: string;
    storeId: string;
  };
}) => (
  <Suspense fallback={<Loading />}>
    <CategoryPageMaker
      categoryId={params.categoryId}
      storeId={params.storeId}
    />
  </Suspense>
);

export default CategoryPage;
