import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import SizeForm from "./components/size-form";
import Loading from "@/components/ui/loading";

const SizePageMaker = async ({ sizeId }: { sizeId: string }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

const SizePage = ({
  params,
}: {
  params: {
    sizeId: string;
  };
}) => (
  <Suspense fallback={<Loading />}>
    <SizePageMaker sizeId={params.sizeId} />
  </Suspense>
);

export default SizePage;
