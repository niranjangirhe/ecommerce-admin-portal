import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import ColorForm from "./components/color-form";
import Loading from "@/components/ui/loading";

const ColorPageMaker = async ({ colorId }: { colorId: string }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

const ColorPage = ({
  params,
}: {
  params: {
    colorId: string;
  };
}) => (
  <Suspense fallback={<Loading />}>
    <ColorPageMaker colorId={params.colorId} />
  </Suspense>
);

export default ColorPage;
