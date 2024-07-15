import { UserButton } from "@clerk/nextjs";
import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { LandingMainNav } from "./landing-page-main-nav";

const LandingPageNavBar = async () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="w-fit h-full p-2">
          <Logo />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <LandingMainNav />
          <ModeToggle />
          <SignedOut>
            <SignInButton>
              <Button>Log in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button>
              <a href="/setup">Dashboard</a>
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default LandingPageNavBar;
