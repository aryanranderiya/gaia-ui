"use client";

import { useState } from "react";
import { Composer, FilePreview } from "@/registry/new-york/ui/composer";

export default function ComposerWithFiles() {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);

  const handleSubmit = (text: string, uploadedFiles?: FilePreview[]) => {
    console.log("Message submitted:", text, "Files:", uploadedFiles);
    alert(
      `Message sent: ${text}\nFiles: ${
        uploadedFiles?.map((f) => f.name).join(", ") || "none"
      }`
    );
  };

  return (
    <div className="flex w-full max-w-3xl justify-center mx-auto">
      <Composer
        value={message}
        onValueChange={setMessage}
        onSubmit={handleSubmit}
        files={files}
        onFilesChange={setFiles}
        placeholder="Attach files and send a message..."
        showFileUpload={true}
      />
    </div>
  );
}
