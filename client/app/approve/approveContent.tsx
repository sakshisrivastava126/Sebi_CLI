// "use client";

// import { useSearchParams } from "next/navigation";

// export default function ApproveContent() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   return <div>Token: {token}</div>;
// }

"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { CheckCircle, XCircle } from "lucide-react";

export default function ApproveContent() {
  const searchParams = useSearchParams();
  const userCode = searchParams.get("user_code");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authClient.device.approve({
        userCode: userCode!,
      });
      if (response.data) {
        router.push("/approve/success");
      } else {
        setError("Failed to approve. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeny = async () => {
  await authClient.device.deny({
    userCode: userCode!,
  });
  router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border-2 border-dashed border-zinc-700 rounded-xl p-8 bg-zinc-950 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Authorize Device</h1>
        <p className="text-muted-foreground mb-6">
          Allow <span className="text-white font-semibold">Sebi CLI</span> to access your account?
        </p>
        <p className="font-mono text-lg tracking-widest text-yellow-300 mb-8">{userCode}</p>
        {error && (
          <div className="p-3 rounded-lg bg-red-950 border border-red-900 text-red-200 text-sm mb-4">
            {error}
          </div>
        )}
        <div className="flex gap-4">
          <button
            onClick={handleDeny}
            className="flex-1 py-3 px-4 border-2 border-dashed border-zinc-700 text-zinc-300 font-semibold rounded-lg hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" /> Deny
          </button>
          <button
            onClick={handleApprove}
            disabled={isLoading}
            className="flex-1 py-3 px-4 bg-zinc-100 text-zinc-950 font-semibold rounded-lg hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {isLoading ? "Approving..." : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
}