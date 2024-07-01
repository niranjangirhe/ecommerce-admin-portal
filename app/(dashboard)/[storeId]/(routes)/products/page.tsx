import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import Loading from "@/components/ui/loading";

const ProductPage = async ({
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
          <ProductList storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  );
};

const ProductList = async ({ storeId }: { storeId: string }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: Omit<ProductColumn, "description">[] = products.map(
    (product) => ({
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: formatter.format(product.price.toNumber()),
      category: product.category.name,
      size: product.size.name,
      color: product.color,
      createdAt: format(product.createdAt, "MMMM do, yyyy"),
    })
  );

  return <ProductClient data={formattedProducts} />;
};

export default ProductPage;
