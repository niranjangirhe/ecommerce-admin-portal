"use client";

import { Copy, Server } from "lucide-react";
import toast from "react-hot-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProps {
  description: string;
}

export const CodeBox: React.FC<ApiAlertProps> = ({ description }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard.");
  };

  return (
    <>
      <AlertDescription className="mt-4 flex justify-between">
        <code className="relative whitespace-pre-wrap rounded w-full mr-2 bg-gray-200 dark:bg-gray-800 px-[0.5rem] py-[0.6rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </>
  );
};
