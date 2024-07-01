import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import ProductForm from "./components/product-form";
import Loading from "@/components/ui/loading";

const ProductPageMaker = async ({
  productId,
  storeId,
}: {
  productId: string;
  storeId: string;
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

const ProductPage = ({
  params,
}: {
  params: {
    productId: string;
    storeId: string;
  };
}) => (
  <Suspense fallback={<Loading />}>
    <ProductPageMaker productId={params.productId} storeId={params.storeId} />
  </Suspense>
);

export default ProductPage;
