import prismadb from "@/lib/prismadb";
import { RedirectToSignIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
      <div>
        <UserButton />
        This will be a Navbar
      </div>
      {children}
    </>
  );
}
