"use client";

import Image from "next/image";
import { useCallback } from "react";
import { RxAvatar } from "react-icons/rx";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

type FileWithPreview = File & { preview: string };

export default function UploadComponent({
  path,
  setFiles,
  files,
}: {
  path?: string;
  setFiles: (e: File[]) => void;
  files: File[];
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: generateClientDropzoneAccept(["image"]),
  });

  const filePreview = (files[0] as FileWithPreview)?.preview;
  return (
    <div className="h-150 flex w-full flex-col items-center justify-center">
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        {!!path || !!filePreview ? (
          <Image
            alt="profile"
            width={150}
            height={150}
            className="rounded-full"
            src={filePreview ?? path}
            onLoad={() => {
              filePreview && URL.revokeObjectURL(filePreview);
            }}
          />
        ) : (
          <RxAvatar size={120} />
        )}
      </div>
    </div>
  );
}
