import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div>
      <SignedOut>
        <p>You must be signed in to access this page.</p>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        <h1>Protected page</h1>
      </SignedIn>
    </div>
  );
};

export default SetupPage;
