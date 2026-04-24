"use client";

import DynamicDocumentForm from "@/components/dynamic-document-form";
import { DOCUMENT_MODELS } from "@/lib/document-models";
import { useSearchParams } from "next/dist/client/components/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") as keyof typeof DOCUMENT_MODELS;
  return <>
    <DynamicDocumentForm type={type} />
  </>;
}
