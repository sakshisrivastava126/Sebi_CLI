"use client";

import { Spinner } from "@/components/ui/spinner";
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