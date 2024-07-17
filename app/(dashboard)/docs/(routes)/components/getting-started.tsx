import { ApiAlert } from "@/components/ui/api-alert";
import { CodeBox } from "@/components/ui/code-box";

const GettingStartedDoc = () => {
  return (
    <div>
      <p className="mb-4">
        Follow these steps to set up the StoreOps admin portal on your local
        machine:
      </p>

      <ol className="list-decimal list-inside space-y-4 mb-6">
        <li>
          <p className="inline">Clone the repository:</p>
          <CodeBox description="git clone https://github.com/niranjangirhe/ecommerce-admin-portal.git" />
        </li>

        <li>
          <p className="inline">
            Install dependencies (Node.js version 20 is recommended):
          </p>
          <CodeBox description="npm i" />
        </li>

        <li>
          <p className="inline">
            Set up environment variables as per the sample.env file.
          </p>
        </li>

        <li>
          <p className="inline">Start the development server:</p>
          <CodeBox description="npm run dev" />
        </li>
      </ol>

      <h2 className="text-lg font-semibold mb-4">
        Environment Variables Requirements
      </h2>

      <p className="mb-4">
        You will need to set up the following environment variables:
      </p>

      <CodeBox
        description={`STRIPE_WEBHOOK_SECRET=\nNEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=\nCLERK_SECRET_KEY=\nNEXT_PUBLIC_CLERK_SIGN_IN_URL=\nNEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up\nDATABASE_URL=\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=\nSTRIPE_API_KEY=`}
      />

      <p className="mb-4">
        Ensure you have access to all necessary services and replace the
        placeholder values with your actual credentials.
      </p>

      <h2 className="text-lg font-semibold mb-4">Additional Requirements</h2>

      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
        <li>Clerk account for authentication</li>
        <li>Stripe account for payment processing</li>
        <li>Cloudinary account for image hosting</li>
        <li>MySQL database</li>
      </ul>

      <p className="mb-4">
        Make sure you have accounts set up with these services and have obtained
        the necessary API keys and credentials.
      </p>
    </div>
  );
};

export default GettingStartedDoc;
