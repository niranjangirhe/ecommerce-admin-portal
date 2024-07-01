import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: "calc(100vh - 128px)",
      }}
    >
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
}
