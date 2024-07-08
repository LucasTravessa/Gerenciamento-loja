"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { RxAvatar } from "react-icons/rx";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

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

  return (
    <div className="h-150 flex w-full flex-col items-center justify-center">
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        {!!path || !!files[0]?.preview ? (
          <Image
            alt="profile"
            width={150}
            height={150}
            className="rounded-full"
            src={files[0]?.preview ?? path}
            onLoad={() => {
              files[0]?.preview && URL.revokeObjectURL(files[0].preview);
            }}
          />
        ) : (
          <RxAvatar size={120} />
        )}
      </div>
    </div>
  );
}
