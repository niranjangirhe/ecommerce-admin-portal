import { ApiAlert } from "@/components/ui/api-alert";
import { CodeBox } from "@/components/ui/code-box";

const StoreFrontEndDoc = () => {
  return (
    <div>
      <p className="mb-4">
        Follow these steps to set up the StoreOps store frontend example project
        on your local machine:
      </p>

      <ol className="list-decimal list-inside space-y-4 mb-6">
        <li>
          <p className="inline">Clone the repository:</p>
          <CodeBox description="git clone https://github.com/niranjangirhe/ecommerce-store-frontend.git" />
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

      <CodeBox description={`NEXT_PUBLIC_API_URL=`} />

      <p className="mb-4">
        You'll get this value from the admin portal in settings section. Check
        out{" "}
        <a href="/docs#base-url" className="underline text-blue-800">
          Base URL
        </a>
      </p>

      <p className="mb-4 text-muted-foreground italic">
        Make sure you have store set up in admin portal to ensure proper
        functioning of the store frontend.
      </p>
    </div>
  );
};

export default StoreFrontEndDoc;
