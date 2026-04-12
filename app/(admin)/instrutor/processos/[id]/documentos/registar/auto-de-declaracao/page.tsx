import { EditorComponent } from "@/components/documentos/auto-declaracao/editor-component";

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-muted p-4">
      <EditorComponent />
    </div>
  );
}
