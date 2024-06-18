import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <a
          href="/dashboard"
          className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
        >
          Dashboard
        </a>
      </SignedIn>
    </>
  );
}
