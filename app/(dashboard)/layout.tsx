import { ModalProvider } from "@/providers/modal-provider";
import { SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <ModalProvider />
      {children}
    </div>
  );
}
