import prismadb from "@/lib/prismadb";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    return <RedirectToSignIn />;
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/setup");
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
