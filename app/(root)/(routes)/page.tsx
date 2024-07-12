import LandingPageNavBar from "@/components/landing-page-navbar";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Footer from "./components/footer";
import Preview from "./components/preview";

export default function Home() {
  return (
    <div>
      <LandingPageNavBar />
      <div className="h-[calc(100vh-64px)] py-2 bg-gradient-to-b from-blue-300 to-blue-50 dark:from-slate-800 dark:to-slate-950 flex justify-center">
        <div className="max-w-3xl text-center content-center grid gap-5">
          <h4 className="text-lg font-light">BUILD AN ECOMMERCE EMPIRE</h4>
          <h1 className="text-4xl md:text-6xl">Start selling immediately.</h1>
          <h1 className="text-4xl md:text-6xl"> Grow without limits.</h1>
          <h5 className="text-lg font-light max-w-md justify-self-center">
            Streamline your e-commerce operations with our powerful, all-in-one
            management solution.
          </h5>
          <div className="flex justify-center mt-8">
            <SignedIn>
              <Button className="bg-slate-800 font-light p-2 dark:bg-slate-100 hover:bg-slate-950 hover:dark:bg-white text-white dark:text-slate-950 py-2 px-4 rounded-full">
                <a href="/setup">Go to Dashboard</a>
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="bg-slate-800 font-light p-2 dark:bg-slate-100 hover:bg-slate-950 hover:dark:bg-white text-white dark:text-slate-950 py-2 px-4 rounded-full">
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
      <Preview />
      <Footer />
    </div>
  );
}
