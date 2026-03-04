"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle, XCircle, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Suspense } from "react";
import ApproveContent from "./approveContent";

// Removed DeviceApprovalPage as logic should be handled in ApproveContent

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner/></div>}>
      <ApproveContent />
    </Suspense>
  );
}