import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";
import Loading from "@/components/ui/loading";

const BillboardPageMaker = async ({ billboardId }: { billboardId: string }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

const BillboardPage = ({
  params,
}: {
  params: {
    billboardId: string;
  };
}) => (
  <Suspense fallback={<Loading />}>
    <BillboardPageMaker billboardId={params.billboardId} />
  </Suspense>
);

export default BillboardPage;
