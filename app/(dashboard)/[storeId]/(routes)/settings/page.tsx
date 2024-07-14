import { Suspense } from "react";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import SettingsForm from "./components/settings-form";
import Loading from "@/components/ui/loading";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<Loading />}>
          <SettingsContent storeId={params.storeId} userId={userId} />
        </Suspense>
      </div>
    </div>
  );
};

const SettingsContent: React.FC<{ storeId: string; userId: string }> = async ({
  storeId,
  userId,
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
    include: {
      billboards: true,
    },
  });

  if (!store) {
    redirect("/setup");
  }

  return <SettingsForm initialData={store} />;
};

export default SettingsPage;
