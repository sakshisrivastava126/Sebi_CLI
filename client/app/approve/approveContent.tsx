"use client";

import { useSearchParams } from "next/navigation";

export default function ApproveContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <div>Token: {token}</div>;
}

